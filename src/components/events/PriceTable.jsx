import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Pen, Trash } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function PriceTable({ prices }) {
  console.log(prices);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Prices Details</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Team Size</TableHead>
              <TableHead>Price DIT</TableHead>
              <TableHead>Price Non DIT</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price) => (
              <TableRow key={price.id}>
                <TableCell className="font-medium">{price.teamSize}</TableCell>
                <TableCell>{price.priceDit}</TableCell>
                <TableCell>{price.priceNonDit}</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex gap-2">
                    <Button size={"icon"}>
                      <Pen />
                    </Button>
                    <Button size={"icon"}>
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PriceTable;
