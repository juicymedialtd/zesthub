import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

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

  return (
    <>
      {!loading && (
        <div>
          {holidays.length > 0 && (
            <div>
              <div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-topnav-bg">
                            <tr>
                              <th
                                scope="col"
                                className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                              >
                                Created By
                              </th>
                              <th
                                scope="col"
                                className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                              >
                                Reason
                              </th>
                              <th
                                scope="col"
                                className="hidden px-3 py-2 text-right text-sm font-semibold text-white lg:table-cell"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="hidden px-3 py-2 text-right text-sm font-semibold text-white lg:table-cell"
                              >
                                Start Date
                              </th>
                              <th
                                scope="col"
                                className="hidden px-3 py-2 text-right text-sm font-semibold text-white sm:table-cell"
                              >
                                End Date
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-right text-sm font-semibold text-white"
                              >
                                Days Used
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {holidays.map((item) => (
                              <tr key={item.id}>
                                <td className="px-3 text-right py-2 text-sm text-gray-500 whitespace-nowrap">
                                  {item.User.name}
                                </td>
                                <td className="w-3/4 max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 capitalize">
                                  {item.type}
                                  <dl className="font-normal lg:hidden">
                                    <dt className="mt-1">
                                      Status - {item.status}
                                    </dt>
                                    <dd className="mt-1 truncate text-gray-700">
                                      {format(
                                        parseISO(item.startDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </dd>
                                    <dt className="sr-only sm:hidden">Email</dt>
                                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                      {format(
                                        parseISO(item.endDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </dd>
                                  </dl>
                                </td>
                                <td className="hidden text-right px-3 py-2 text-sm text-gray-500 lg:table-cell capitalize">
                                  {item.status}
                                </td>
                                <td className="hidden text-right px-3 py-2 text-sm text-gray-500 lg:table-cell">
                                  {format(
                                    parseISO(item.startDate),
                                    "dd/MM/yyyy"
                                  )}
                                </td>
                                <td className="hidden text-right px-3 py-2 text-sm text-gray-500 sm:table-cell">
                                  {format(parseISO(item.endDate), "dd/MM/yyyy")}
                                </td>
                                <td className="px-3 text-right py-2 text-sm text-gray-500 whitespace-nowrap">
                                  {item.daysUsed}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
