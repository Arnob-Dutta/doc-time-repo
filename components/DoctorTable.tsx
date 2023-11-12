"use client"

import * as React from "react"
import {
  CaretSortIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteSingleDoctors } from "@/lib/actions/doctor.action"
import { useRouter } from "next/navigation"
export const dynamic = 'force-dynamic'

export type DoctorTable = {
  _id: string
  fee: number
  name: string
  title: string
  commission: number
}


// @ts-ignore
export default function DoctorTable({ data }) {

  const router = useRouter()

  // Colum----------------

  const columns: ColumnDef<DoctorTable>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <h1 className="text-emon-accent font-bold">
              Doctor Name
            </h1>
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "specialty",
      header: () => {
        return <h1 className="text-emon-accent font-bold">
          Doctor Specialty
        </h1>
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("specialty")}</div>,
    },
    {
      accessorKey: "fee",
      header: () => {
        return <h1 className="text-emon-accent font-bold">
          Doctor Fee
        </h1>
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("fee"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className=" font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "commission",
      header: () => {
        return <h1 className="text-emon-accent font-bold">
          Commission
        </h1>
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("commission"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className=" font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "_id",
      header: () => {
        return <h1 className="text-emon-accent font-bold">
          Actions
        </h1>
      },
      cell: ({ row }) => <Button variant={"outline"} onClick={async () => {
        const res = await deleteSingleDoctors({ uid: row.getValue("_id") })
        if (res) {
          router.refresh()
          toast.success("Doctor deleted successfully.")
        } else {
          toast.error("Something is wrong.")
        }
      }}><Trash2 color="red" /></Button>,
    },
  ]

  // ---------------------

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="p-10">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Link href={"/admin/add-doctor"}>
          <Button>Add Doctor</Button>
        </Link>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="space-x-2">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
