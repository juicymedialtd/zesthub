import { format, parseISO } from "date-fns";
import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MilageRequested() {
  const [data, setData] = useState([]);

  async function MileageData() {
    const res = await fetch("/api/admin/mileage/pending").then((res) =>
      res.json()
    );
    setData(res.pending);
  }

  async function approveRequest(id) {
    await fetch(`/api/admin/mileage/${id}/approve`).then(() => {
      MileageData();
    });
  }

  async function denyRequest(id) {
    await fetch(`/api/admin/mileage/${id}/deny`).then(() => {
      MileageData();
    });
  }

  useEffect(() => {
    MileageData();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "gbp",
  });

  return (
    <>
      {data.length > 0 && (
        <>
          <div className="ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
            <table className="min-w-full">
              <thead className="bg-main-bg">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white lg:table-cell"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                  >
                    createdAt
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
                  >
                    Miles
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Cost
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 text-left sm:pr-6">
                    <span className=" text-white">Approval</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data !== undefined &&
                  data.map((item) => (
                    <tr key={item.id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6">
                        {item.User.name}
                        <dl className="font-normal lg:hidden">
                          <dd className="mt-1 truncate">{item.reason}</dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm truncate lg:table-cell">
                        {item.reason}
                      </td>
                      <td className="hidden px-3 py-4 text-sm sm:table-cell">
                        {format(parseISO(item.createdAt), "dd/MM/yyyy")}
                      </td>

                      <td className="px-3 py-4 text-sm whitespace-nowrap sm:table-cell">
                        {item.miles}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap sm:table-cell">
                        {formatter.format(item.miles * 0.45)}
                      </td>
                      <td className="py-4 text-left text-sm font-medium whitespace-nowrap">
                        <div className="hidden sm:block space-x-4">
                          <button
                            onClick={() => approveRequest(item.id)}
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => denyRequest(item.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                                        "block px-4 py-2 text-sm"
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
                                        "block px-4 py-2 text-sm"
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
