import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/api/event";
import { data } from "react-router-dom";

export function EventAddForm() {
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: (data) => {
      return createEvent(data);
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "eventPoster") {
        formData.append("eventPoster", data.eventPoster[0]);
      } else if (key === "coordinator") {
        const coordinatorArray = data.coordinator
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
        formData.append("coordinator", JSON.stringify(coordinatorArray));
      } else {
        formData.append(key, data[key]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-none" onSubmit={handleSubmit(onSubmit)}>
      <form action="submit">
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
                  {...register("eventPoster", { required: true })}
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
                    id="eventDescription"
                    type="text"
                    {...register("participantMin", { required: true })}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </div>
        <Button type="submit" className="w-full mt-6 cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  );
}
