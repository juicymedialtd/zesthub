import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

export default function Expenses() {
  const router = useRouter();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("0.00");

  async function getData() {
    const res = await fetch("/api/expenses/get").then((res) => res.json());

    if (res.expenses) {
      setData(res.expenses);
      setLoading(false);
    }
  }

  function calcTotal() {
    if (data !== undefined) {
      let t = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "APPROVED") {
          const total = t + data[i].total;
          t = total;
        }
      }

      setTotal(t);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    calcTotal();
  }, [data]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {/* <p className="mt-2 text-sm text-gray-700">
                  For claims submitted from{" "}
                  <time dateTime="2022-08-01">May 1, 2022</time> to{" "}
                  <time dateTime="2022-08-31">May 31, 2022</time>.
                </p> */}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={() => router.push("/expenses/add")}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Expense
              </button>
            </div>
          </div>
          {!loading && (
            <div className=" mt-8 flex flex-col sm:-mx-6 md:mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      Reason
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Receipt
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Date Submitted
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data !== undefined &&
                    data.map((item) => {
                      return (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="mt-0.5 text-gray-500 sm:hidden">
                              {item.status} - Submitted on {item.createdAt}
                            </div>
                          </td>
                          <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                            <a href={item.receipt}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-center"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </a>
                          </td>
                          <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
                            {item.status}
                          </td>
                          <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
                            {format(parseISO(item.createdAt), "dd/MM/yyyy")}
                          </td>

                          <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                            £{item.total}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan={4}
                      className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      Approved Total
                    </th>
                    <th
                      scope="row"
                      className="pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:hidden"
                    >
                      Approved Total
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                      £{total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
