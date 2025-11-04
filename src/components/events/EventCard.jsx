import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function EventCard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Event Name</CardTitle>
          <CardDescription>This is event description.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <span>Co-ordinators: </span>
            <span>Venue: </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default EventCard;
