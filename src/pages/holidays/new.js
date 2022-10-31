import { useState } from "react";
import { Combobox } from "@headlessui/react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-12 ">
          <div className="rounded-t-md">
            <div className="flex flex-row justify-between align-middle">
              <div className="flex flex-col">
                <h1 className="text-white text-3xl font-bold">
                  Request Leave
                </h1>
              </div>

              
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-md p-8">
          <div className="mt-6 w-full lg:w-1/3">
            <Combobox as="div" value={selectedType} onChange={setSelectedType}>
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
              <DatePicker selected={eD} onChange={(date) => setEndDate(date)} />
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
      </div>
    </div>
  );
}
