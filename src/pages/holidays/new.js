import { useState, useEffect } from "react";
import { Combobox, Menu, Transition } from "@headlessui/react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  CheckIcon,
  SelectorIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

import "react-datepicker/dist/react-datepicker.css";
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
} from "date-fns";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    start: "1:00 PM",
    startDatetime: "2022-01-21T13:00",
    end: "2:30 PM",
    endDatetime: "2022-01-21T14:30",
  },
  // More meetings...
];

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RequestHoliday() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [sD, setStartDate] = useState(null);
  const [eD, setEndDate] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState();
  const [half, setHalf] = useState(false);
  const [events, setEvents] = useState([]);

  const HolidayType = [
    { id: 1, name: "Annual Leave", type: "annual" },
    { id: 2, name: "Training", type: "training" },
    { id: 3, name: "Dentist", type: "other" },
    { id: 4, name: "Health", type: "health" },
    { id: 5, name: "Birthday", type: "birthday" },
  ];

  const filteredPeople =
    query === ""
      ? HolidayType
      : HolidayType.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  async function submitLeave() {
    await fetch("/api/holidays/create-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: sD,
        end: eD,
        type: selectedType,
        half,
      }),
    }).then(() => router.push("/holidays"));
  }

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
      const range = [];
      const events = [];

      let currentDate = parseISO(holidays[i].startDate);

      for (let i = 0; i < d; i++) {
        range.push(currentDate);
        currentDate = addDays(currentDate, 1);
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

      events.push(...range);
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
    <div className="flex justify-center 2xl:h-full items-center py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="">
          <div className="rounded-t-md">
            <div className="flex flex-row justify-between align-middle">
              <div className="flex flex-col">
                <h1 className="text-white text-3xl font-bold">Request Leave</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row">
          <div className="mt-6 bg-white rounded-md p-8">
            <div className="mt-6 w-full">
              <Combobox
                as="div"
                value={selectedType}
                onChange={setSelectedType}
              >
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  Type of Leave
                </Combobox.Label>
                <div className="relative mt-2">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person) =>
                      person ? person.name : "Please assign a Type"
                    }
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>

                  {filteredPeople.length > 0 && (
                    <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPeople.map((person) => (
                        <Combobox.Option
                          key={person.id}
                          value={person}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {person.name}
                              </span>

                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-indigo-600"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row mt-8 mb-12">
              <div>
                <label>Start Date</label>
                <DatePicker
                  selected={sD}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div>
                <label>End Date</label>
                <DatePicker
                  selected={eD}
                  onChange={(date) => setEndDate(date)}
                />
              </div>

              {sD !== null &&
                eD !== null &&
                format(sD, "dd/MM/yyyy") === format(eD, "dd/MM/yyyy") && (
                  <div className="relative flex items-start mt-8">
                    <div className="flex h-5 items-center">
                      <input
                        id="candidates"
                        aria-describedby="candidates-description"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        value={half}
                        onChange={() => setHalf(!half)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-700"
                      >
                        Half Day?
                      </label>
                    </div>
                  </div>
                )}
            </div>
            <div className="mt-8 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => submitLeave()}
              >
                Submit Request
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="2xl:ml-4 mt-6 bg-white rounded-md p-8">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
              <div className="md:pr-6">
                <div className="flex items-center">
                  <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    type="button"
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    onClick={previousMonth}
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-10 grid grid-cols-7 ml-3 text-center text-xs leading-6 text-gray-500">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="mt-2 mr-1 grid grid-cols-7 text-sm">
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
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={classNames(
                          day.isSelected && "text-white",
                          isEqual(day, selectedDay) && "text-red-600",
                          !day.isSelected &&
                            !day.isToday &&
                            day.isCurrentMonth &&
                            "text-gray-900",
                          !day.isSelected &&
                            !day.isToday &&
                            !day.isCurrentMonth &&
                            "text-gray-900",
                          day.isSelected && day.isToday && "bg-indigo-600",
                          day.isSelected && !day.isToday && "bg-gray-900",
                          !day.isSelected && "hover:bg-gray-200",
                          (day.isSelected || day.isToday) && "font-semibold",
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <section className="mt-12 md:mt-0 md:pl-6">
                <h2 className="font-semibold text-gray-900">
                  Approved for this date
                  {/* <time dateTime="2022-01-21">{selectedDay}</time> */}
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                  {events.length > 0 &&
                    events.map((event) => {
                      const i = event.range;
                      return (
                        <>
                          {i.map((date) => (
                            <>
                              {isSameDay(date, selectedDay) && (
                                <li
                                  key={event.id}
                                  className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-100"
                                >
                                  {event.User.profileUrl ? (
                                    <img
                                      className="inline-block h-10 w-10 rounded-full"
                                      src={`${process.env.NEXT_PUBLIC_S3}/${event.User.profileUrl}`}
                                      alt=""
                                    />
                                  ) : (
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                                      <span className="text-xs font-medium leading-none text-white">
                                        {event.User.name[0]}
                                      </span>
                                    </span>
                                  )}
                                  <div className="flex-auto">
                                    <p className="text-gray-900">
                                      {event.User.name}
                                    </p>
                                    <p className="mt-0.5">
                                      Created:
                                      <time
                                        className="ml-2"
                                        dateTime={format(
                                          parseISO(event.startDate),
                                          "dd/MM/yyyy"
                                        )}
                                      >
                                        {format(
                                          parseISO(event.startDate),
                                          "dd/MM/yyyy"
                                        )}
                                      </time>
                                    </p>
                                  </div>
                                </li>
                              )}
                            </>
                          ))}
                        </>
                      );
                    })}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
