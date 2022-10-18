import { useQuery } from "react-query";

async function miles() {
  const res = await fetch("/api/mileage/all");
  return res.json();
}

export default function Miles() {
  const { data, status, error } = useQuery("miles", miles);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Milage Tracking</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="float-right">
            <a
              type="button"
              href="/mileage/new"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-gray-900 bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Add a new trip
            </a>
          </div>
        </div>
        {status === "success" && (
          <>
            {data.submissions.length > 0 && (
              <>
                <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-topnav-bg">
                      <tr>
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
                          Starting Postcode
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-2 text-right text-sm font-semibold text-white sm:table-cell"
                        >
                          End Postcode
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-sm font-semibold text-white"
                        >
                          No. of stops
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-sm font-semibold text-white"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-sm font-semibold text-white"
                        >
                          Miles
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-sm font-semibold text-white"
                        >
                          Est Cost
                        </th>
                        {/* <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.submissions.length > 0 &&
                        data.submissions.map((item) => (
                          <tr key={item.id}>
                            <td className="w-3/4 max-w-0 py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 capitalize">
                              {item.type}
                              <dl className="font-normal lg:hidden">
                                <dt className="mt-1">Status - {item.status}</dt>
                                <dd className="mt-1 truncate text-gray-700">
                                  {format(
                                    parseISO(item.startDate),
                                    "dd/MM/yyyy"
                                  )}
                                </dd>
                                <dt className="sr-only sm:hidden">Email</dt>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                  {format(parseISO(item.endDate), "dd/MM/yyyy")}
                                </dd>
                              </dl>
                            </td>
                            <td className="hidden text-right px-3 py-2 text-sm text-gray-500 lg:table-cell capitalize">
                              {item.status}
                            </td>
                            <td className="hidden text-right px-3 py-2 text-sm text-gray-500 lg:table-cell">
                              {format(parseISO(item.startDate), "dd/MM/yyyy")}
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
