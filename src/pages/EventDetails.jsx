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
import { getRegistrationByEventId } from "@/api/registration";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const {
    data,
    isLoading: registrationLoading,
    isError: registrationError,
  } = useQuery({
    queryKey: ["event-registrations"],
    queryFn: () => getRegistrationByEventId(id),
    enabled: !!id,
  });

  console.log(data);

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

      <div className="mt-6 grid grid-cols-3 gap-4">
        {data?.registrations.map((elm, inx) => [
          <Card>
            <CardHeader>
              <CardTitle>{elm?.teamName}</CardTitle>
              <CardDescription>{elm?.collegeName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex flex-col gap-2">
                  <span>E-mail: {elm?.email}</span>
                  <span>Member Count: {elm?.membersCount}</span>
                  <span>
                    Payment Status:{" "}
                    <Badge
                      variant={elm.paymentStatus ? "success" : "destructive"}
                    >
                      {elm.paymentStatus ? "True" : "False"}
                    </Badge>
                  </span>
                  <span>Payment Amount: {elm?.paymentAmount}</span>
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger>
                      <Button>Members</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div>
                        <Table>
                          <TableCaption>Members Details</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Name</TableHead>
                              <TableHead>College Id</TableHead>
                              <TableHead>Phone No</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* {elm?.registrations?.map((element, index) => (
                              <TableRow key={index}>
                                <TableCell>{element.name}</TableCell>
                                <TableCell>{element.collegeId}</TableCell>
                                <TableCell>{element.phoneNo}</TableCell>
                              </TableRow>
                            ))} */}
                            {elm?.members?.map((member, index) => (
                              <TableRow key={index}>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.collegeId}</TableCell>
                                <TableCell>{member.phoneNo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>,
        ])}
      </div>
    </div>
  );
}

export default EventDetails;
