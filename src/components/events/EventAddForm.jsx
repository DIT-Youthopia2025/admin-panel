import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "@/api/event";
import { toast } from "sonner";
import { useRef } from "react";

export function EventAddForm({ onSuccess, mode = "create", initialData, eventId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {},
  });
  const queryClient = useQueryClient();
  const isSubmittingRef = useRef(false);
  
  const mutation = useMutation({
    mutationFn: (data) => {
      return mode === "edit"
        ? updateEvent({ id: eventId, updatedEvent: data })
        : createEvent(data);
    },
    onSuccess: () => {
      toast.success(mode === "edit" ? "Event updated successfully!" : "Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      reset(); // Reset form after successful submission
      isSubmittingRef.current = false; // Reset flag
      if (onSuccess) {
        onSuccess(); // Callback to close dialog or handle success
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || (mode === "edit" ? "Error updating event" : "Error creating event")
      );
      console.error(mode === "edit" ? "Error updating event:" : "Error creating event:", error);
      isSubmittingRef.current = false; // Reset flag on error
    },
  });

  const onSubmit = async (data) => {
    // Prevent duplicate submissions
    if (isSubmittingRef.current || mutation.isPending) {
      return;
    }

    isSubmittingRef.current = true;

    const hasNewPoster = data?.eventPoster && data.eventPoster.length > 0;

    if (mode === "edit" && !hasNewPoster) {
      // Send JSON when editing without a new poster to avoid multipart handling on backend
      const payload = Object.fromEntries(
        Object.entries(data).flatMap(([key, value]) => {
          if (key === "eventPoster") {
            return [];
          }
          if (key === "coordinator") {
            const coordinatorArray = String(value || "")
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean);
            return [["coordinator", coordinatorArray]];
          }
          return [[key, value]];
        })
      );

      mutation.mutate(payload);
      return;
    }

    // Default: create or edit with new poster -> use FormData
    const formData = new FormData();
    for (const key in data) {
      if (key === "eventPoster") {
        if (hasNewPoster) {
          formData.append("eventPoster", data.eventPoster[0]);
        }
      } else if (key === "coordinator") {
        const coordinatorArray = String(data.coordinator || "")
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
        formData.append("coordinator", JSON.stringify(coordinatorArray));
      } else {
        formData.append(key, data[key]);
      }
    }

    mutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-none">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="eventName">Event Name</FieldLabel>
                <Input
                  id="eventName"
                  type="text"
                  placeholder=""
                  {...register("eventName", { required: true })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="eventDescription">
                  Event Description
                </FieldLabel>
                <Textarea
                  id="eventDescription"
                  {...register("eventDescription", { required: true })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="eventPoster">Event Poster</FieldLabel>
                <Input
                  id="eventPoster"
                  type="file"
                  {...register("eventPoster", { required: mode !== "edit" })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <div className="flex justify-between gap-3 mt-4">
                <Field>
                  <FieldLabel htmlFor="venue">Venue</FieldLabel>
                  <Input
                    id="venue"
                    type="text"
                    {...register("venue", { required: true })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="coordinator">
                    Event Co-ordinators
                  </FieldLabel>
                  <Input
                    id="coordinator"
                    type="text"
                    {...register("coordinator", { required: true })}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="category">Event Category</FieldLabel>
                <Input
                  id="category"
                  type="text"
                  {...register("category", { required: true })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <div className="flex justify-between gap-3 mt-4">
                <Field>
                  <FieldLabel htmlFor="startTime">Start Time</FieldLabel>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    placeholder=""
                    {...register("startTime", { required: true })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="endTime">End Time</FieldLabel>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    {...register("endTime", { required: true })}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          {/* Participants */}
          <FieldSet>
            <FieldGroup>
              <div className="flex justify-between gap-3 mt-4">
                <Field>
                  <FieldLabel htmlFor="participantMax">
                    Participant Max
                  </FieldLabel>
                  <Input
                    id="participantMax"
                    type="text"
                    {...register("participantMax", { required: true })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="participantMin">
                    Participant Min
                  </FieldLabel>
                  <Input
                    id="participantMin"
                    type="text"
                    {...register("participantMin", { required: true })}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </div>
        <Button type="submit" className="w-full mt-6 cursor-pointer" disabled={mutation.isPending || isSubmittingRef.current}>
          {mutation.isPending || isSubmittingRef.current
            ? mode === "edit" ? "Updating..." : "Creating..."
            : mode === "edit" ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}
