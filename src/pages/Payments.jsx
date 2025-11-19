import { getAllPayments } from "@/api/payment";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function Payments() {
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });
  return <div>Payments</div>;
}

export default Payments;
