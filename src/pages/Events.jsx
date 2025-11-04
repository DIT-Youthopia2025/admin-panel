import EventCard from "@/components/events/EventCard";
import EventDialog from "@/components/events/EventDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event.js";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

function Events() {
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  console.log("Fetched events:", events);

  if (isLoading)
    return <p className="text-center text-white">Loading events...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching events</p>;
  return (
    <div className="px-6 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl italic font-semibold">Events</h1>
        <EventDialog>
          <Button className="cursor-pointer">
            <Plus />
            <span>Create</span>
          </Button>
        </EventDialog>
      </div>
      {events.length == 0 && (
        <p className="text-center mt-8">No Events Found</p>
      )}
      <div className="grid grid-cols-3 mt-3 gap-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;
