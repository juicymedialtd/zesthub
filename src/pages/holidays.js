import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import RequestLeaveModal from "../components/RequestLeaveModal";

async function getHolidays() {
  const res = await fetch("/api/v1/user/holidays/all");
  return res.json();
}

export default function Holidays() {
  const { data, status, error, refetch } = useQuery(
    "getUserHolidays",
    getHolidays
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  async function deleteHoliday(id) {
    await fetch(`/api/v1/user/holidays/${id}/delete`, {
      method: 'DELETE'
    })
        .then((res) => res.json())
        .then(() => {
          refetch()
        })
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {status === "loading" && (
            <div className="flex flex-col justify-center items-center h-screen">
              {/* <Loader color="green" size={100} /> */}
            </div>
          )}

          {status === "success" && (
            <>
              {data.holidays.length > 0 && (
                <>
                  <div className="mt-12 ">
                    <div className="p-4 rounded-t-md">
                      <div className="flex flex-row justify-between align-middle">
                        <div className="flex flex-col">
                          <span className="text-[#FED929]">Holidays Left</span>
                          <h1 className="text-white text-3xl font-bold">
                            {data.stats.holidaysLeft} of{" "}
                            {data.stats.HolidayAllowance}
                          </h1>
                        </div>

                        <div className="mt-2">
                          <RequestLeaveModal refetch={refetch} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0">
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
                          <th
                              scope="col"
                              className="px-3 py-2 text-right text-sm font-semibold text-white"
                          >

                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {data.holidays.map((item) => (
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
                            <td className="px-3 text-right py-2 text-sm text-gray-500 whitespace-nowrap">
                              <Menu as="div" className="relative inline-block text-left">
                                <div>
                                  <Menu.Button className="flex items-center text-gray-800 hover:text-gray-400 ">
                                    <span className="sr-only">Open options</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>

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
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                              Edit
                                            </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => deleteHoliday(item.id)}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-red-900' : 'text-red-700',
                                                    'block px-4 py-2 text-sm w-full text-left'
                                                )}
                                            >
                                              Delete
                                            </button>
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
              {data.holidays.length === 0 && (
                <>
                  <div className="text-center mt-[24rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-white">
                      You haven't requested any time off yet!
                    </h3>
                    <p className="mt-1 text-sm text-white">
                      Book time off using the link below.
                    </p>
                    <div className="mt-6">
                      <RequestLeaveModal refetch={refetch} />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
