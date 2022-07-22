import { Fragment, useState } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { XIcon, PlusIcon } from "@heroicons/react/outline";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RequestLeaveModal() {
  const [open, setOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [sD, setStartDate] = useState(null);
  const [eD, setEndDate] = useState(null);
  const [reason, setReason] = useState();
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState();

  const HolidayType = [
    { id: 1, name: "Annual Leave", type: "ANNUAL" },
    { id: 2, name: "Training", type: "Training" },
    { id: 3, name: "Dentist", type: "DENTIST" },
    { id: 3, name: "Sick Leave", type: "SICK" },
  ];

  const filteredPeople =
    query === ""
      ? HolidayType
      : HolidayType.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  async function submitLeave() {
    await fetch("/api/holidays/create-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: sD,
        end: eD,
        reason: reason,
      }),
    });
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Request Leave
      </button>
      <>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Please select your requested timeframe
                        </Dialog.Title>
                        <div className="mt-2">
                          {/* <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Reason
                          </label>
                          <div className="mt-1">
                            <input
                              type="reason"
                              name="reason"
                              id="reason"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Holiday :)"
                              onChange={(e) => setReason(e.target.value)}
                              value={reason}
                            />
                          </div> */}

                          <div className="mt-1">
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
                                  onChange={(event) =>
                                    setQuery(event.target.value)
                                  }
                                  displayValue={(person) =>
                                    person
                                      ? person.name
                                      : "Please assign a Type"
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
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600"
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

                          <div className={focusedInput ? "mt-2 mb-80" : "mt-2 mb-12"}>
                            <DateRangePicker
                              startDate={sD}
                              startDateId="tata-start-date"
                              endDate={eD}
                              endDateId="tata-end-date"
                              onDatesChange={handleDatesChange}
                              focusedInput={focusedInput}
                              onFocusChange={(focusedInput) =>
                                setFocusedInput(focusedInput)
                              }
                              className="z-50"
                            />
                          </div>
                        </div>
                      </div>
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    </>
  );
}
