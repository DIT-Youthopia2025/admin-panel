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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, fetchEventById } from "@/api/event";
import { toast } from "sonner";
import EventDialog from "./EventDialog";
import { Eye, IndianRupee, Pen, Trash } from "lucide-react";
import PriceDialog from "./PriceDialog";

function EventCard({ event }) {
  const queryClient = useQueryClient();

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

  const { refetch } = useQuery({
    queryKey: ["event", event.id],
    queryFn: () => fetchEventById(event.id),
    enabled: false,
  });

  const handleView = () => {
    refetch().then((result) => {
      if (result.isSuccess) {
        console.log("View Event Data:", result.data);
        toast.info(`Viewing event: ${result.data.eventName}`);
      } else if (result.isError) {
        toast.error("Error fetching event details");
      }
    });
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
              onClick={handleView}
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
