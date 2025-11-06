import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "@/api/event";
import { toast } from "sonner";
import { useRef } from "react";
import { createPrice } from "@/api/price";

export function PriceAddForm({
  onSuccess,
  mode = "create",
  initialData,
  eventId,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {},
  });
  const queryClient = useQueryClient();
  const isSubmittingRef = useRef(false);

  const mutation = useMutation({
    mutationFn: (data) => {
      return mode === "edit"
        ? updateEvent({ id: eventId, updatedEvent: data })
        : createPrice(data);
    },
    onSuccess: () => {
      toast.success(
        mode === "edit"
          ? "Price updated successfully!"
          : "Price created successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      reset(); // Reset form after successful submission
      isSubmittingRef.current = false; // Reset flag
      if (onSuccess) {
        onSuccess(); // Callback to close dialog or handle success
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          (mode === "edit" ? "Error updating event" : "Error creating event")
      );
      console.error(
        mode === "edit" ? "Error updating event:" : "Error creating event:",
        error
      );
      isSubmittingRef.current = false; // Reset flag on error
    },
  });

  const onSubmit = async (data) => {
    // Prevent duplicate submissions
    if (isSubmittingRef.current || mutation.isPending) {
      return;
    }

    isSubmittingRef.current = true;

    if (mode === "edit" && !hasNewPoster) {
      //   mutation.mutate(payload);
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-none">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="teamSize">Team Size</FieldLabel>
                <Input
                  id="teamSize"
                  type="number"
                  placeholder=""
                  {...register("teamSize", { required: true })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="priceDit">Price DIT</FieldLabel>
                <Input
                  id="priceDit"
                  type="number"
                  {...register("priceDit", { required: true })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="priceNonDit">Price Non Dit</FieldLabel>
                <Input
                  id="priceNonDit"
                  type="number"
                  {...register("priceNonDit", { required: mode !== "edit" })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 cursor-pointer"
          disabled={mutation.isPending || isSubmittingRef.current}
        >
          {mutation.isPending || isSubmittingRef.current
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update"
            : "Submit"}
        </Button>
      </form>
    </div>
  );
}
