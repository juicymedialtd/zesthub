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
        <div className="py-4">
          {!loading && (
            <div className=" mt-8 flex flex-col sm:-mx-6 md:mx-0">
              <div className="flex flex-row justify-between p-4 bg-nav-bg ">
                <div className="flex flex-col">
                  <span className="text-primary font-bold">
                    Expenses submitted
                  </span>
                  <span className="text-4xl font-bold text-white">£500</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => router.push("/expenses/add")}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Request Expense
                  </button>
                </div>
              </div>
              <table className="min-w-full">
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
                      className="hidden py-2 px-3 text-left text-sm font-semibold text-white sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 px-3 text-left text-sm font-semibold text-white sm:table-cell"
                    >
                      Date Submitted
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 px-3 text-left text-sm font-semibold text-white sm:table-cell"
                    >
                      Receipt
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-3 pr-4 text-right text-sm font-semibold text-white sm:pr-6 md:pr-12"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data !== undefined &&
                    data.map((item) => {
                      let status;

                      switch (item.status) {
                        case item.status === "APPROVED":
                          status = "bg-white";
                          break;
                        case item.status === "PENDING":
                          status = "bg-yellow-300";
                          break;
                        case item.status === "DECLINED":
                          status = "bg-red-300";
                          break;
                      }

                      return (
                        <tr key={item.id} className={status}>
                          <td className="py-2 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="font-bold text-gray-900 capitalize">
                              {item.title}
                            </div>
                            <div className="mt-0.5 text-gray-900 sm:hidden">
                              {item.status} - Submitted on {item.createdAt}
                            </div>
                          </td>

                          <td className="hidden py-1 px-3 text-left text-sm text-gray-900 sm:table-cell font-bold">
                            {item.status}
                          </td>
                          <td className="hidden py-1 px-3 text-left text-sm text-gray-900 sm:table-cell font-bold">
                            {format(parseISO(item.createdAt), "dd/MM/yyyy")}
                          </td>
                          <td className="hidden py-1 px-3 text-right text-sm text-gray-900 sm:table-cell font-bold">
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
                          <td className="py-2 pl-3 pr-4 text-right text-sm text-gray-900 sm:pr-6 md:pr-12 font-bold">
                            £{item.total}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
