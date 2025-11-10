import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEventById } from "@/api/event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PriceTable from "@/components/events/PriceTable";

function EventDetails() {
  const { id } = useParams();
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    enabled: !!id, // Only run the query if the id exists
  });

  if (isLoading) {
    return <div className="p-6">Loading event details...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">Error fetching event details.</div>
    );
  }

  if (!event) {
    return <div className="p-6">Event not found.</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.eventName}</CardTitle>
          <CardDescription className="text-base">
            {event.eventDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {event.eventPoster && (
            <div className="max-w-md">
              <img
                src={event.eventPoster}
                alt={`${event.eventName} poster`}
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <Badge variant="outline">{event.category}</Badge>
            </p>
            <p>
              <strong>Coordinators:</strong> {event.coordinators}
            </p>
            <p>
              <strong>Event Time:</strong>{" "}
              {new Date(event.startTime).toLocaleString()} to{" "}
              {new Date(event.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Participants:</strong> Minimum {event.participantMin} /
              Maximum {event.participantMax}
            </p>
            {/* You can add a similar useQuery here to fetch and display price details if needed */}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <PriceTable prices={event.prices} />
      </div>
    </div>
  );
}

export default EventDetails;
