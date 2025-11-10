import { getAllRegistrations } from "@/api/registration";
import RegistrationCard from "@/components/registrations/RegistrationCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function Registration() {
  const {
    data: registrations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registrations"],
    queryFn: getAllRegistrations,
  });

  if (isLoading)
    return <p className="text-center text-white">Loading registrations...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Error fetching registrations</p>
    );
  return (
    <>
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl italic font-semibold tracking-wider">
            Registrations
          </h1>
        </div>
        {registrations?.length == 0 && (
          <p className="text-center mt-8">No registrations Found</p>
        )}
        <div className="grid grid-cols-3 mt-3 gap-3">
          {registrations?.map((registration) => (
            <RegistrationCard
              key={registration.id}
              registration={registration}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Registration;
