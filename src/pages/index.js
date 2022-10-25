import { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CashIcon, SunIcon, TruckIcon } from "@heroicons/react/outline";
import { format, parse, parseISO } from "date-fns";
import { PlusIcon } from "@heroicons/react/solid";
import RequestLeaveModalDashboard from "../components/RequestLeaveModal/dashboard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [expenses, setExpenses] = useState();
  const [miles, setMiles] = useState();
  const [holidays, setHolidays] = useState();
  const [feed, setFeed] = useState();

  async function CalendarData() {
    const res = await fetch("/api/calendar/get").then((res) => res.json());
    const holidays = res.holidays;

    setEvents(holidays);
  }

  async function getStats() {
    const res = await fetch("/api/user/stats").then((res) => res.json());
    setHolidays(res.holidayCount.holidaysLeft);
    setMiles(res.totalMilage);
    setExpenses(res.totalExpenses);
  }

  async function getFeed() {
    const res = await fetch("/api/user/feed").then((res) => res.json());
    setFeed(res.feed);
  }

  useEffect(() => {
    CalendarData();
    getStats();
    getFeed();
  }, []);

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
                      <a href="/expenses/new">
                        <PlusIcon className="h-8 w-8 text-primary" />
                      </a>
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Expense submitted
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">£{expenses}</span>
                      </div>
                      <a
                        href="/expenses"
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </a>
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
                      <a href="/mileage/new">
                      <PlusIcon className="h-8 w-8 text-primary" />
                      </a>
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Miles submitted
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">{miles}mi</span>
                      </div>
                      <a
                        href="/mileage"
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </a>
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
                      <RequestLeaveModalDashboard />
                    </div>
                    <div className="mt-2 space-y-2">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        Holidays Left
                      </h3>
                      <div className="">
                        <span className="text-3xl font-bold">{holidays}</span>
                      </div>
                      <a
                        href="holidays"
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
                      >
                        View All
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row">
          <div className="bg-white w-full sm:w-1/4 mr-8 rounded-md">
            <div className="p-4">
              <h1 className="font-bold text-xl">Upcoming Events</h1>
              {feed !== undefined &&
                feed.map((item) => (
                  <div key={item.id} className="py-4">
                    <div className="flex space-x-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-xs font-medium leading-none text-white">
                        {item.User.name[0]}
                        </span>
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium capitalize">
                          {item.User.name} - {item.type}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {format(parseISO(item.startDate), "MM/dd/yyyy")} -{" "}
                          {format(parseISO(item.endDate), "MM/dd/yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full sm:w-3/4 sm:ml-8 mt-4 sm:mt-0 mb-12 sm:mb-4 rounded-md bg-white">
            <div className="p-4 flex flex-row divide-x h-full divide-gray-600">
              <div className="w-1/2">
                <h1 className="text-xl font-bold ">Wiki</h1>
              </div>
              <div className="w-1/2 pl-4 mr-6">
                <h1 className="text-xl font-bold ">Documents</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
