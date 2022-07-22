import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  CashIcon,
  GlobeIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState();

  async function CalendarData() {
    const res = await fetch("/api/calendar/get").then((res) => res.json());
    const holidays = res.holidays;

    setEvents(holidays);
  }

  async function getStats() {
    const res = await fetch("/api/user/stats").then((res) => res.json());
    setData(res.holidayCount);
  }

  useEffect(() => {
    CalendarData();
    getStats();
  }, []);

  const cards = [
    {
      name: "Expenses submitted",
      href: "/expenses",
      icon: CashIcon,
      amount: "£0.00",
    },
    {
      name: "Miles submitted",
      href: "/miles",
      icon: LocationMarkerIcon,
      amount: "0",
    },
    {
      name: "Holidays Left",
      href: "/holidays",
      icon: GlobeIcon,
      amount: data !== undefined ? data.holidaysLeft : "",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mt-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-rows-3 gap-4">
              <div className="">
                <h2 className="font-semibold text-gray-900">
                  Upcoming events within the next 2 weeks
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                  {events.length > 0 &&
                    events.map((event) => (
                      <li
                        key={event.id}
                        className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-100"
                      >
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                          <span className="font-medium leading-none text-white">
                            {event.User.name[0].toUpperCase()}
                          </span>
                        </span>
                        <div className="flex-auto">
                          <p className="text-gray-900">{event.reason}</p>
                          <p className="mt-0.5">
                            <time dateTime={event.startDate}>
                              {format(parseISO(event.startDate), "dd/m/yyyy")}
                            </time>{" "}
                            -{" "}
                            <time dateTime={event.endDate}>
                              {format(parseISO(event.endDate), "dd/m/yyyy")}
                            </time>
                          </p>
                        </div>
                        {/* <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
                  <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
