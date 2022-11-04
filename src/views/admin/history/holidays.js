import { useEffect, useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      type="text"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Type to filter"
    />
  );
}

function Table({ columns, data }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-topnav-bg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="py-2 pl-4 pr-3 text-sm text-left font-semibold text-white sm:pl-6"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-2 text-left text-sm text-gray-500 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default function AdminAllHolidays() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState();

  async function getHolidays() {
    const response = await fetch("/api/v1/admin/holidays/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (response.success) {
      setHolidays(response.holidays);
      setLoading(false);
    }
  }

  useEffect(() => {
    getHolidays();
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.display({
      id: "createdBy",
      header: "createdBy",
      accessorKey: "User.name",
    }),
    columnHelper.display({
      id: "type",
      header: "Reason",
      accessorKey: "type",
    }),
    columnHelper.display({
      id: "status",
      header: "Status",
      accessorKey: "status",
    }),
    columnHelper.display({
      id: "StartDate",
      header: "Start Date",
      accessorFn: (row) => `${format(parseISO(row.startDate), "dd/MM/yyyy")}`,
    }),
    columnHelper.display({
      id: "endDate",
      header: "End Date",
      accessorFn: (row) => `${format(parseISO(row.endDate), "dd/MM/yyyy")}`,
    }),
    columnHelper.display({
      id: "status",
      header: "Status",
      accessorKey: "status",
    }),
    columnHelper.display({
      id: "used",
      header: "Days Used",
      accessorKey: "daysUsed",
    }),
  ];

  return (
    <>
      {!loading && (
        <div>
          {holidays.length > 0 && (
            <div>
              <Table data={holidays} columns={columns} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
