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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "@/api/event"; // Removed fetchEventById
import { toast } from "sonner";
import EventDialog from "./EventDialog";
import { Eye, IndianRupee, Pen, Trash } from "lucide-react";
import PriceDialog from "./PriceDialog";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

function EventCard({ event }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // <-- Initialize navigate

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error("Error deleting event");
      console.error("Error deleting event:", error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(event.id);
  };
  
  const handleView = () => {
    navigate(`/event/${event.id}`);
  };

  const initialEditData = {
    eventName: event.eventName || "",
    eventDescription: event.eventDescription || "",
    venue: event.venue || "",
    coordinator: Array.isArray(event.coordinator)
      ? event.coordinator.join(", ")
      : event.coordinator || "",
    category: event.category || "",
    startTime: event.startTime || "",
    endTime: event.endTime || "",
    participantMax: event.participantMax ?? "",
    participantMin: event.participantMin ?? "",
  };

  const initialPriceData = {
    teamSize: 0,
    priceDit: 0,
    priceNonDit: 0,
    eventId: event.id,
  };

  return (
    <>
      <Card key={event.id}>
        <CardHeader>
          <CardTitle>Name: {event.eventName}</CardTitle>
          <CardDescription>
            Description: {event.eventDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <span>
              {" "}
              Coordinators:
              {Array.isArray(event.coordinator) && event.coordinator.length > 0
                ? event.coordinator
                    .map((name) =>
                      name.replace(/^\[?"?/, "").replace(/"?\]?$/, "")
                    )
                    .join(", ")
                : "N/A"}
            </span>

            <span>Venue : {event.venue} </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>
            <PriceDialog initialData={initialPriceData} eventId={event.id}>
              <Button className="cursor-pointer">
                <IndianRupee />
              </Button>
            </PriceDialog>
          </div>
          <div className="flex justify-between gap-2">
            <Button
              variant="secondary"
              onClick={handleView} // <-- This onClick handler now navigates
              className="cursor-pointer"
            >
              <Eye />
            </Button>
            <EventDialog
              mode="edit"
              initialData={initialEditData}
              eventId={event.id}
            >
              <Button className="cursor-pointer">
                <Pen />
              </Button>
            </EventDialog>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="cursor-pointer"
            >
              <Trash />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default EventCard;