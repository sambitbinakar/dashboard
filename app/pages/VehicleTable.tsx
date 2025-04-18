import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {format } from"date-fns"

interface VehicleTableProps {
  vehicle: any;
}
const VehicleTable: React.FC<VehicleTableProps> = ({ vehicle }) => {
  const filterAndSortedTransaction = vehicle;
  const handleSort = () => {};
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">slNo</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort()}
              >
                Date
              </TableHead>
              <TableHead>Track_Id</TableHead>
              <TableHead>Number_plate</TableHead>
              <TableHead>Vehicle_Type</TableHead>
              <TableHead>Vehicle_Company</TableHead>
              <TableHead>Vehicle_Color</TableHead>
              <TableHead>Entry_time</TableHead>
              <TableHead>Exit_time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterAndSortedTransaction.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
                filterAndSortedTransaction.map((transaction: any) => (
                <TableRow>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.track_id}</TableCell>
                <TableCell>{transaction.number_plate}</TableCell>
                <TableCell className="">{transaction.vehicle_type}</TableCell>
                <TableCell className="">{transaction.company}</TableCell>
                <TableCell className="">{transaction.color}</TableCell>
                <TableCell className="">{transaction.entry_time}</TableCell>
                <TableCell className="">{transaction.exit_time}</TableCell>
              </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleTable;
