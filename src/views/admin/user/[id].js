import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  HandIcon,
  UserIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/solid";
import { format, parseISO } from "date-fns";

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

const view = [
  {
    id: 1,
    type: "holiday",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminUserProfile({ user }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [show, setShow] = useState(view[0]);

  async function userDetails() {
    const res = await fetch(`/api/v1/admin/users/${user}/details`).then((res) =>
      res.json()
    );
    setProfile(res.user);
    setLoading(false);
  }

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div className="py-4">
      {!loading && (
        <>
          {profile !== undefined && (
            <main className="">
              {/* Page header */}
              <div className="md:flex md:items-center md:justify-between md:space-x-5 px-4">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {profile.profileUrl ? (
                        <img
                          className="h-16 w-16 rounded-full"
                          src={`${process.env.NEXT_PUBLIC_S3}/${profile.profileUrl}`}
                          alt=""
                        />
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                          <span className="text-xs font-medium leading-none text-white">
                            {profile.name[0]}
                          </span>
                        </span>
                      )}
                      <span
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {profile.name}
                    </h1>
                    <p className="text-sm font-medium text-white">
                      Profile created on:
                      <time
                        dateTime={format(
                          parseISO(profile.createdAt),
                          "dd/MM/yyyy"
                        )}
                      >
                        {" "}
                        {format(parseISO(profile.createdAt), "dd/MM/yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    Edit Leave Allowance
                  </button>
                </div>
              </div>

              <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2
                          id="applicant-information-title"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Users History & Information
                        </h2>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="w-1/5">
                          <Listbox value={show} onChange={setShow}>
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Filter
                                </Listbox.Label>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                    <span className="block truncate">
                                      {show.type}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {view.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-indigo-600"
                                                : "text-gray-900",
                                              "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {person.type}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-indigo-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>

                        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                          {show.type === "holiday" && (
                            <>
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                    >
                                      Created By
                                    </th>

                                    <th
                                      scope="col"
                                      className="hidden px-3 py-2 text-right text-sm font-semibold lg:table-cell"
                                    >
                                      Status
                                    </th>
                                    <th
                                      scope="col"
                                      className="hidden px-3 py-2 text-right text-sm font-semibold lg:table-cell"
                                    >
                                      Start Date
                                    </th>
                                    <th
                                      scope="col"
                                      className="hidden px-3 py-2 text-right text-sm font-semibold sm:table-cell"
                                    >
                                      End Date
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-2 text-right text-sm font-semibold"
                                    >
                                      Days Used
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {profile.holidays.map((item) => (
                                    <tr key={item.id}>
                                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                        {item.type}
                                        <dl className="font-normal lg:hidden">
                                          <dt className="sr-only">Title</dt>
                                          <dd className="mt-1 truncate text-gray-700">
                                            {item.status}
                                          </dd>
                                          <dd className="mt-1 truncate text-gray-700">
                                            {format(
                                              parseISO(item.startDate),
                                              "dd/MM/yyyy"
                                            )}
                                          </dd>
                                          <dt className="sr-only sm:hidden">
                                            Email
                                          </dt>
                                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                            {format(
                                              parseISO(item.endDate),
                                              "dd/MM/yyyy"
                                            )}
                                          </dd>
                                        </dl>
                                      </td>
                                      <td className="hidden text-right px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {item.status}
                                      </td>
                                      <td className="hidden text-right px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                        {format(
                                          parseISO(item.startDate),
                                          "dd/MM/yyyy"
                                        )}
                                      </td>
                                      <td className="px-3 text-right py-4 text-sm text-gray-500">
                                        {format(
                                          parseISO(item.endDate),
                                          "dd/MM/yyyy"
                                        )}
                                      </td>
                                      <td className="px-3 text-right py-4 text-sm text-gray-500">
                                        {item.daysUsed}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <section
                  aria-labelledby="timeline-title"
                  className="lg:col-span-1 lg:col-start-3"
                >
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2
                      id="timeline-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Holiday Timeline {new Date().getFullYear()}
                    </h2>

                    <div>
                      {profile.holidaysLeft} of {profile.HolidayAllowance} days used this year
                    </div>

                    {/* Activity Feed */}
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {profile.holidays.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== profile.holidays.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span className=" bg-primary h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                                    <PaperAirplaneIcon className="h-5 w-5 text-white rotate-90 ml-1" />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 mt-0.5">
                                  <div className="">
                                    <p className="text-sm capitalize">
                                      {item.type}
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>
                                      {format(
                                        parseISO(item.startDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          )}
        </>
      )}
    </div>
  );
}
