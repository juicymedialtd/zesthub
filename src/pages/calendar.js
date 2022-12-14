import { Fragment, useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  parse,
  parseISO,
  startOfToday,
  addDays,
  isWeekend,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import bankhols from "../libs/holidays/2022/uk.json";

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [national, setNational] = useState(bankhols);

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  async function CalendarData() {
    const res = await fetch("/api/calendar/get").then((res) => res.json());
    const holidays = res.holidays;

    for (let i = 0; i < holidays.length; i++) {
      const d = holidays[i].daysUsed;
      const events = [];

      let s = new Date(holidays[i].startDate);
      const e = new Date(holidays[i].endDate);

      function calcR(start, end) {
        let range = [];
        let curDate = new Date(start.getTime());
        while (curDate <= end) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) range.push(curDate);
          curDate = addDays(curDate, 1);
        }
        return range;
      }

      let colour;

      const annual = "bg-[#6261A5]";
      const training = "bg-[#3887C9]";
      const health = "bg-[#50AC56]";
      const nationalHoliday = "bg-[#E37638]";
      const other = "bg-[#B8354C]";

      switch (holidays[i].type) {
        case "annual":
          colour = annual;
          break;
        case "training":
          colour = training;
          break;
        case "health":
          colour = health;
          break;
        case "nationalHoliday":
          colour = nationalHoliday;
          break;
        case "other":
          colour = other;
          break;
        case "birthday":
          colour = "bg-teal-800";
          break;
      }

      events.push(...calcR(s, e));
      holidays[i].range = events;
      holidays[i].colour = colour;
    }

    setEvents(res.holidays);
  }

  useEffect(() => {
    CalendarData();
  }, []);

  console.log(events);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <div className="flex flex-row flex-wrap mt-2 gap-4">
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6261A5] font-semibold text-white" />
            <span className="text-white">Annual Leave</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3887C9] font-semibold text-white" />
            <span className="text-white">Training</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#50AC56] font-semibold text-white" />
            <span className="text-white">Health</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E37638] font-semibold text-white" />
            <span className="text-white">National Holiday</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B8354C] font-semibold text-white" />
            <span className="text-white">Other</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-800 font-semibold text-white" />
            <span className="text-white">Birthday</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="lg:flex lg:h-full lg:flex-col border bg-white rounded-md">
            <header className="relative flex items-center space-x-12 border-b border-gray-200 py-4 ml-4 lg:flex-none">
              <h1 className="text-lg font-semibold text-gray-900">
                <time dateTime="2022-01">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </time>
              </h1>
              <div className="flex items-center">
                <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(format(today, "MMM-yyyy"))}
                    className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  >
                    Today
                  </button>
                  <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:items-center">
                  {/* <div className="h-6 w-px bg-gray-300" />
                  <button
                    type="button"
                    className="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add event
                  </button> */}
                </div>
                <Menu as="div" className="relative ml-6 md:hidden">
                  <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Create event
                            </a>
                          )}
                        </Menu.Item> */}
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() =>
                                setCurrentMonth(format(today, "MMM-yyyy"))
                              }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm hover:cursor-pointer"
                              )}
                            >
                              Go to today
                            </span>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
              <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                <div className="bg-white py-2">
                  S<span className="sr-only sm:not-sr-only">un</span>
                </div>
                <div className="bg-white py-2">
                  M<span className="sr-only sm:not-sr-only">on</span>
                </div>
                <div className="bg-white py-2">
                  T<span className="sr-only sm:not-sr-only">ue</span>
                </div>
                <div className="bg-white py-2">
                  W<span className="sr-only sm:not-sr-only">ed</span>
                </div>
                <div className="bg-white py-2">
                  T<span className="sr-only sm:not-sr-only">hur</span>
                </div>
                <div className="bg-white py-2">
                  F<span className="sr-only sm:not-sr-only">ri</span>
                </div>
                <div className="bg-white py-2">
                  S<span className="sr-only sm:not-sr-only">at</span>
                </div>
              </div>
              <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        currentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                        "relative h-24 2xl:h-40"
                      )}
                    >
                      <div
                        className={classNames(
                          isEqual(today, day)
                            ? "flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-semibold text-white"
                            : undefined,
                          "ml-2 mt-1"
                        )}
                      >
                        {format(day, "d")}
                      </div>

                      <div className="mt-2">
                        {events.length > 0 &&
                          events.map((event) => {
                            const i = event.range;
                            const e = event;

                            return (
                              <>
                                {i
                                  .slice(
                                    0,
                                    e.daysUsed === 0.5 ? e.daysUsed : undefined
                                  )
                                  .map((date) => {
                                    return (
                                      <>
                                        {isSameDay(date, day) && (
                                          <ol>
                                            <li
                                              key={e.id}
                                              className={`w-full ${event.colour}`}
                                            >
                                              <span
                                                // href={event.href}
                                                className="group flex"
                                              >
                                                <p className="flex-auto truncate font-medium text-white ml-2 capitalize">
                                                  {e.User.profileUrl ? (
                                                    <img
                                                      className="inline-block h-4 w-4 mr-1 rounded-full"
                                                      src={`${process.env.NEXT_PUBLIC_S3}/${e.User.profileUrl}`}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    ""
                                                  )}{" "}
                                                  {e.User.name + " - " + e.type}
                                                  {e.daysUsed === "0.5"
                                                    ? " - 1/2 day"
                                                    : ""}
                                                </p>
                                              </span>
                                            </li>
                                          </ol>
                                        )}
                                      </>
                                    );
                                  })}
                                {event.length > 2 && (
                                  <li className="text-gray-500">
                                    + {event.length - 2} more
                                  </li>
                                )}
                              </>
                            );
                          })}
                        {bankhols.map((item) => {
                          const d = new Date(item.date);

                          return (
                            <div key={item.id}>
                              {isSameDay(d, day) && (
                                <ol>
                                  <li
                                    key={item.id}
                                    className={`w-full bg-[#E37638]`}
                                  >
                                    <span
                                      // href={event.href}
                                      className="group flex"
                                    >
                                      <p className="flex-auto truncate font-medium text-white ml-2 capitalize">
                                        {item.name}
                                      </p>
                                    </span>
                                  </li>
                                </ol>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        currentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                        "relative py-2 px-3"
                      )}
                    >
                      <button
                        key={day.toString()}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={classNames(
                          currentMonth ? "bg-white" : "bg-gray-50",
                          (day.isSelected || day.isToday) && "font-semibold",
                          day.isSelected && "text-white",
                          isEqual(day, selectedDay) && "text-red-600",
                          !day.isSelected &&
                            day.isCurrentMonth &&
                            !day.isToday &&
                            "text-gray-900",
                          !day.isSelected &&
                            !day.isCurrentMonth &&
                            !day.isToday &&
                            "text-gray-500",
                          "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                        )}
                      >
                        <time
                          dateTime={format(day, "yyyy-MM-dd")}
                          className={classNames(
                            day.isSelected &&
                              "flex h-6 w-6 items-center justify-center rounded-full",

                            "ml-auto"
                          )}
                        >
                          {format(day, "d")}
                        </time>
                        <span className="sr-only">{events.length} events</span>
                        {events.length > 0 &&
                          events.map((event) => {
                            const i = event.range;
                            return (
                              <>
                                {i.slice(0, event.daysUsed).map((date) => {
                                  return (
                                    <>
                                      {isSameDay(date, day) && (
                                        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                          <div className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                                        </span>
                                      )}
                                    </>
                                  );
                                })}
                                {event.length > 2 && (
                                  <li className="text-gray-500">
                                    + {event.length - 2} more
                                  </li>
                                )}
                              </>
                            );
                          })}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {events.length > 0 &&
              events.map((event) => {
                const i = event.range;
                const e = event;

                return (
                  <>
                    {i
                      .slice(0, e.daysUsed === 0.5 ? e.daysUsed : undefined)
                      .map((date) => (
                        <>
                          {isSameDay(date, selectedDay) && (
                            <div className="py-10 px-2 lg:hidden">
                              <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                                <li
                                  key={event.id}
                                  className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-5 gap-4"
                                >
                                  <div className="flex-auto">
                                    <p className="font-semibold text-gray-900">
                                      {event.type} - {event.User.name}
                                    </p>
                                    <time
                                      dateTime={event.startDate}
                                      className="mt-2 flex items-center text-gray-700"
                                    >
                                      <ClockIcon className="mr-2 h-5 w-5 text-gray-400" />
                                      {format(
                                        parseISO(event.startDate),
                                        "dd/MM/yyyy"
                                      )}
                                    </time>
                                  </div>
                                </li>
                              </ol>
                            </div>
                          )}
                        </>
                      ))}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
