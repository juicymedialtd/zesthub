import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  CashIcon,
  GlobeIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";
import { PlusIcon, SunIcon, TruckIcon } from "@heroicons/react/solid";

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
    <>
      <div className="mt-6">
        <h2 className="text-2xl leading-6 font-bold text-white">Overview</h2>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <CashIcon className="h-8 w-8 text-gray-500" />
                      <PlusIcon className="h8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Expense submitted
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">£520.00</span>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <TruckIcon className="h-8 w-8 text-gray-500" />
                      <PlusIcon className="h8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Miles submitted
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">£520.00</span>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex flex-col ">
                    <div className="flex flex-row justify-between">
                      <SunIcon className="h-8 w-8 text-gray-500" />
                      <PlusIcon className="h8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Holidays Left
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">£520.00</span>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
