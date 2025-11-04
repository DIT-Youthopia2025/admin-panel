import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PriceAddForm } from "./PriceAddForm";

function PriceDialog({
  children,
  mode = "create",
  initialData,
  eventId,
  open: controlledOpen,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const dialogOpen = isControlled ? controlledOpen : open;
  const [formKey, setFormKey] = useState(0);

  const handleOpenChange = (newOpen) => {
    if (!isControlled) setOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
    if (!newOpen) {
      // Reset form key when dialog closes to ensure clean state on next open
      setFormKey((prev) => prev + 1);
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Price" : "Create Price"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update the price details."
              : "Fill in the details below to create a new price."}
          </DialogDescription>
        </DialogHeader>
        <PriceAddForm
          key={formKey}
          mode={mode}
          initialData={initialData}
          eventId={eventId}
          onSuccess={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PriceDialog;
