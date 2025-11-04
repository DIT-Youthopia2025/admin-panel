import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function EventCard({ event }) {
  console.log(event.coordinator);
  return (
    <>
      <Card key={event.id}>
        <CardHeader>
          <CardTitle>Name: {event.eventName}</CardTitle>
          <CardDescription>Description: {event.eventDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
          <span> Coordinators: 
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
      </Card>
    </>
  );
}

export default EventCard;
