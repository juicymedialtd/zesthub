import { format, parseISO } from "date-fns";
import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HolidaysRequested() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function HolidayData() {
    const res = await fetch("/api/admin/holidays/holidays-requested").then(
      (res) => res.json()
    );
    setData(res.holidays);
    setLoading(false);
  }

  async function approveRequest(id) {
    await fetch(`/api/admin/holidays/${id}/approve`).then(() => {
      HolidayData();
    });
  }

  async function denyRequest(id) {
    await fetch(`/api/admin/holidays/${id}/deny`).then(() => {
      HolidayData();
    });
  }

  useEffect(() => {
    HolidayData();
  }, []);

  return (
    <>
      {!loading && data.length > 0 && (
        <>
          <div className="ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
            <table className="min-w-full">
              <thead className="bg-main-bg">
                <tr>
                  <th
                    scope="col"
                    className="py-1.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-1.5 text-left text-sm font-semibold text-white lg:table-cell"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-1.5 text-left text-sm font-semibold text-white sm:table-cell"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-1.5 text-left text-sm font-semibold text-white sm:table-cell"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-sm font-semibold text-white"
                  >
                    Days Used
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-sm font-semibold text-white"
                  >
                    Days Left
                  </th>
                  <th
                    scope="col"
                    className="relative py-1.5 pl-3 pr-4 sm:pr-6 text-left"
                  >
                    <span className="font-bold text-white text-sm">
                      Approval
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data !== undefined &&
                  data.map((item) => (
                    <tr key={item.id} className="">
                      <td className="w-full max-w-0 py-1.5 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6 ">
                        {item.User.name}
                        <dl className="font-normal lg:hidden">
                          <dd className="mt-1 truncate text-gray-700">
                            {item.reason}
                          </dd>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {format(parseISO(item.startDate), "dd/MM/yyyy")} -{" "}
                            {format(parseISO(item.endDate), "dd/MM/yyyy")}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-1.5 text-sm  lg:table-cell">
                        {item.type}
                      </td>
                      <td className="hidden px-3 py-1.5 text-sm  sm:table-cell">
                        {format(parseISO(item.startDate), "dd/MM/yyyy")}
                      </td>
                      <td className="hidden px-3 py-1.5 text-sm  sm:table-cell">
                        {format(parseISO(item.endDate), "dd/MM/yyyy")}
                      </td>
                      <td className="px-3 py-1.5 text-sm  whitespace-nowrap sm:table-cell">
                        {item.daysUsed} days
                      </td>
                      <td className="px-3 py-1.5 text-sm  whitespace-nowrap sm:table-cell">
                        {item.User.holidaysLeft} days
                      </td>
                      <td className="py-1.5 text-left text-sm font-medium whitespace-nowrap">
                        <div className="hidden sm:block space-x-4">
                          <button
                            onClick={() => approveRequest(item.id)}
                            type="button"
                            className="inline-flex items-center text-xs font-bold text-green-600 hover:text-green-500"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => denyRequest(item.id)}
                            className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 "
                          >
                            Deny
                          </button>
                        </div>
                        <Menu
                          as="div"
                          className="relative inline-block text-left sm:hidden"
                        >
                          <div>
                            <Menu.Button className="rounded-full flex items-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-blue-500">
                              <span className="sr-only">Open options</span>
                              <DotsVerticalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      onClick={() => approveRequest(item.id)}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-white"
                                          : "text-gray-700",
                                        "block px-4 py-1.5 text-sm"
                                      )}
                                    >
                                      Approve
                                    </span>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      onClick={() => denyRequest(item.id)}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-white"
                                          : "text-gray-700",
                                        "block px-4 py-1.5 text-sm"
                                      )}
                                    >
                                      Deny
                                    </span>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {data.length === 0 && (
        <>
          <div className="flex flex-col mt-80">
            <div className="m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">
                There are no current pending requests
              </h3>
            </div>
          </div>
        </>
      )}
    </>
  );
}
