import { useState } from "react";
import ExpensesRequested from "../components/Admin/ExpensesRequested";
import HolidaysRequested from "../components/Admin/HolidaysRequested";
import MilageRequested from "../components/Admin/MilageRequested";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminPage() {
  const [show, setShow] = useState("hol");

  const tabs = [
    { name: "Pending Holiday Requests", current: true, id: "hol" },
    { name: "Pending Expense Requests", current: false, id: "exp" },
    { name: "Pending Mileage Requests", current: false, id: "mil" },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={tabs.find((tab) => tab.id === show).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setShow(tab.id)}
                      className={classNames(
                        tab.id === show
                          ? "border-primary text-white hover:text-secondary"
                          : "border-transparent text-gray-500 hover:text-secondary hover:border-gray-200",
                        "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      aria-current={show === tab.id ? "page" : undefined}
                    >
                      {tab.name}
                      {/* {data ? (
                        <span
                          className={classNames(
                            tab.id === show
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-gray-100 text-gray-900",
                            "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                          )}
                        >
                          {data.length}
                        </span>
                      ) : null} */}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {show === "hol" && (
              <>
                <HolidaysRequested />
              </>
            )}
            {show === "exp" && (
              <>
                <ExpensesRequested />
              </>
            )}
            {show === "mil" && (
              <>
                <MilageRequested />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
