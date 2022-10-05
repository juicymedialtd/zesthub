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
  addBusinessDays,
  addDays,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  let selectedDayEvents = events.filter((event) => {
    const data = [];

    for (let i = 0; i < event.range.length; i++) {
      if (isSameDay(event.range[i], selectedDay)) {
        data.push(event);
      }
    }

    return data;
  });

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  async function CalendarData() {
    const res = await fetch("/api/calendar/get").then((res) => res.json());
    const holidays = res.holidays;

    for (let i = 0; i < holidays.length; i++) {
      const d = holidays[i].daysUsed;
      const range = [];
      const events = [];

      let currentDate = parseISO(holidays[i].startDate);

      for (let i = 0; i < d; i++) {
        range.push(currentDate);
        currentDate = addDays(currentDate, 1);
      }

      let bg = [
        "bg-green-700",
        "bg-blue-700",
        "bg-red-700",
        "bg-amber-700",
        "bg-yellow-700",
        "bg-lime-500",
        "bg-cyan-700",
      ];

      let colour = bg[Math.floor(Math.random() * bg.length)];

      events.push(...range);
      holidays[i].range = events;
      holidays[i].colour = colour;
    }

    setEvents(res.holidays);
  }

  useEffect(() => {
    CalendarData();
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <div>
          
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
                        "relative h-32"
                      )}
                    >
                      <time
                        dateTime={format(day, "yyyy-MM-dd")}
                        className={classNames(
                          isEqual(selectedDay, day)
                            ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white"
                            : undefined,
                          "ml-3"
                        )}
                      >
                        {format(day, "d")}
                      </time>

                      <div className="mt-2">
                        {events.length > 0 &&
                          events.map((event) => {
                            const i = event.range;
                            const e = event;

                            return (
                              <>
                                {i.slice(0, event.daysUsed).map((date) => {
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
                                              <p className="flex-auto truncate font-medium text-white ml-2">
                                                {e.User.name + " - " + e.reason}
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
            {selectedDayEvents.length > 0 && (
              <div className="py-10 px-2 lg:hidden">
                <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                  {selectedDayEvents.map((event) => (
                    <li
                      key={event.id}
                      className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <p className="font-semibold text-gray-900">
                          {event.reason}
                        </p>
                        {/* <time
                          dateTime={event.startDate}
                          className="mt-2 flex items-center text-gray-700"
                        >
                          <ClockIcon
                            className="mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {event.startDate}
                        </time> */}
                      </div>
                      {/* <a
                        href={event.href}
                        className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                      >
                        Edit<span className="sr-only">, {event.name}</span>
                      </a> */}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
