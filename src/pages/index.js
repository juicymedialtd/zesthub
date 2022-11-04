import { useState, useEffect } from "react";
import { CashIcon, SunIcon, TruckIcon } from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";
import { PlusIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Lottie from "react-lottie-player";

import lottie from "../../public/spinner.json";

export default function Home() {
  const session = useSession();

  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState();
  const [miles, setMiles] = useState();
  const [holidays, setHolidays] = useState();
  const [feed, setFeed] = useState();

  async function getStats() {
    const res = await fetch("/api/user/stats").then((res) => res.json());
    setHolidays(res.holidayCount);
    setMiles(res.totalMilage);
    setExpenses(res.totalExpenses);
  }

  async function getFeed() {
    const res = await fetch("/api/user/feed").then((res) => res.json());
    setFeed(res.feed);
  }

  useEffect(() => {
    getStats();
    getFeed();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex h-[90vh] mx-auto justify-center items-center">
          <Lottie
            loop
            animationData={lottie}
            play
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
      {!loading && (
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
                          <PlusIcon className="h-8 w-8 text-primary hover:text-main-bg" />
                        </a>
                      </div>
                      <div className="mt-2 space-y-2">
                        <h3 className="truncate text-sm font-medium text-gray-900">
                          Expense submitted
                        </h3>
                        <div className="">
                          <span className="text-3xl font-bold">
                            £{expenses}
                          </span>
                        </div>
                        <a
                          href="/expenses"
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-primary hover:bg-main-bg hover:text-white px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
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
                          <PlusIcon className="h-8 w-8 text-primary hover:text-main-bg" />
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
                          className="inline-flex items-center rounded-md border border-transparent bg-primary hover:bg-main-bg hover:text-white px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
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
                        <a href="/holidays/new">
                          <PlusIcon className="h-8 w-8 text-primary hover:text-main-bg" />
                        </a>
                      </div>
                      <div className="mt-2 space-y-2">
                        <h3 className="truncate text-sm font-medium text-gray-900">
                          Holidays Left
                        </h3>
                        {holidays !== undefined && (
                          <div className="">
                            <span className="text-3xl font-bold">
                              {holidays.holidaysLeft} of{" "}
                              {holidays.HolidayAllowance}
                            </span>
                          </div>
                        )}
                        <a
                          href="holidays"
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-primary hover:bg-main-bg hover:text-white px-8 py-3 text-sm font-bold leading-4 text-gray-900 shadow-sm"
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

          <div className="mt-8 flex flex-col lg:flex-row">
            <div className="bg-white w-full lg:w-1/4 mr-8 rounded-md">
              <div className="p-4">
                <h1 className="font-bold text-xl">Upcoming Events</h1>
                {feed !== undefined &&
                  feed.map((item) => (
                    <div key={item.id} className="py-4">
                      <div className="flex space-x-3">
                        {item.User.profileUrl ? (
                          <img
                            className="inline-block h-8 w-8 rounded-full"
                            src={`${process.env.NEXT_PUBLIC_S3}/${item.User.profileUrl}`}
                            alt=""
                          />
                        ) : (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-xs font-medium leading-none text-white">
                              {item.User.name[0]}
                            </span>
                          </span>
                        )}

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium capitalize">
                              {item.User.name} - {item.type}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            {format(parseISO(item.startDate), "dd/MM/yyyy")} -{" "}
                            {format(parseISO(item.endDate), "dd/MM/yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-full lg:w-3/4 lg:ml-8 mt-4 lg:mt-0 mb-12 lg:mb-0 rounded-md bg-white">
              <div className="p-4 flex flex-col lg:flex-row lg:divide-x gap h-full divide-gray-600">
                <div className="lg:w-1/2 w-full mb-2 lg:mb-0">
                  <h1 className="text-xl font-bold ">Wiki</h1>
                  <span>Nothing to display.</span>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-4 lg:mr-6 pt-2 lg:pt-0">
                  <h1 className="text-xl font-bold ">Documents</h1>
                  <span>Nothing to display.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
