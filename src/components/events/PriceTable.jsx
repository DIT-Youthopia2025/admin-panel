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
import { useMutation } from "@tanstack/react-query";
import { deletePrice } from "@/api/price";

function PriceTable({ prices }) {
  const mutation = useMutation({
    mutationFn: (id) => deletePrice(id),
  });
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
                    <Button
                      size={"icon"}
                      onClick={() => mutation.mutate(price.id)}
                    >
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
