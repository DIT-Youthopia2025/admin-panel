import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRegistrationById } from "@/api/registration";

function RegistrationDetails() {
  const { id } = useParams();
  const {
    data: registration,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registration", id],
    queryFn: () => getRegistrationById(id),
    enabled: !!id, // Only run the query if the id exists
  });

  if (isLoading) {
    return <div className="p-6">Loading registration details...</div>;
  }

  console.log(registration);

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Error fetching registration details.
      </div>
    );
  }

  if (!registration) {
    return <div className="p-6">Event not found.</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{registration.teamName}</CardTitle>
          <CardDescription className="text-base">
            {registration.email}
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="flex flex-col gap-4">
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
          </div>
        </CardContent> */}
      </Card>
    </div>
  );
}

export default RegistrationDetails;
