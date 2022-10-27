import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";

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
        <div className="py-2">
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
            {data.mileage.length > 0 && (
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
                          className="hidden px-3 py-2 text-left text-sm font-semibold text-white lg:table-cell"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-2 text-left text-sm font-semibold text-white lg:table-cell"
                        >
                          Starting Postcode
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-2 text-left text-sm font-semibold text-white sm:table-cell"
                        >
                          End Postcode
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-white"
                        >
                          No. of stops
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-white"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-white"
                        >
                          Miles
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-sm font-semibold text-white"
                        >
                          Est Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {data.mileage.map((item) => (
                        <>
                          <tr key={item.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {item.reason}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.status}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.startPostcode}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.stops[0].postcode}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.stops.length}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {format(parseISO(item.createdAt), 'dd/MM/yyyy')}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.miles}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                              {item.miles * 0.45}
                            </td>
                          </tr>
                        </>
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
