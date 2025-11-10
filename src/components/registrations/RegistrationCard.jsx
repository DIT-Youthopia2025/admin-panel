import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteRegistration } from "@/api/registration";

function RegistrationCard({ registration, key }) {
  const deleteMutation = useMutation({
    mutationFn: () => deleteRegistration(registration.id),
    onSuccess: () => {
      toast.success("Registration deleted successfully");
    },
  });
  const handleView = () => {};

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>Team Name: {registration.teamName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <span>Email: {registration.email}</span>
          <span>Member Count: {registration.membersCount}</span>
          <span>Payment Amount: {registration.paymentAmount}</span>
          <span>
            Payment Status:{" "}
            <Badge
              variant={registration.paymentStatus ? "success" : "destructive"}
            >
              {registration.paymentStatus ? "True" : "False"}
            </Badge>
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex justify-between gap-2">
          <Button
            variant="secondary"
            onClick={handleView} // <-- This onClick handler now navigates
            className="cursor-pointer"
          >
            <Eye />
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete()}
            disabled={deleteMutation.isPending}
            className="cursor-pointer"
          >
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default RegistrationCard;
