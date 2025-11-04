import EventCard from "@/components/events/EventCard";
import EventDialog from "@/components/events/EventDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

function Events() {
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
      <div className="grid grid-cols-3 mt-3 gap-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
