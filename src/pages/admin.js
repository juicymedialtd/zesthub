import { useRouter } from "next/router";
import ExpensesRequested from "../components/Admin/ExpensesRequested";
import HolidaysRequested from "../components/Admin/HolidaysRequested";
import MilageRequested from "../components/Admin/MilageRequested";
import UserAdmin from "../views/admin/general";
import UserSettings from "../views/settings/users";
import History from "../views/admin/history";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminPanel() {
  const router = useRouter();

  console.log(router.asPath.includes("/admin?history"))

  const tabs = [
    {
      name: "General",
      href: "/admin",
      current: router.asPath === "/admin",
    },
    {
      name: "Holiday Requests",
      href: "?filter=history",
      current: router.asPath === "/admin?filter=history",
    },
    {
      name: "Mileage Requests",
      href: "?filter=mileage",
      current: router.asPath === "/admin?filter=mileage",
    },
    {
      name: "Expense Requests",
      href: "?filter=expenses",
      current: router.asPath === "/admin?filter=expenses",
    },
    {
      name: "History",
      href: "?history=holidays",
      current: router.asPath === "?history=holidays",
    },
  ];

  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="p-4">
          <div className="bg-nav-bg p-4">
            <h1 className="text-white text-3xl font-bold">Administration</h1>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab) => tab.current) !== undefined ? tabs.find((tab) => tab.current).name : ""}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-[#F59E1E] border-b-4 text-[#FED929]"
                          : "border-transparent text-white hover:text-[#FED929]",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="">
            {router.asPath === "/admin" && <UserAdmin />}
            {router.asPath === "/admin?filter=history" && (
              <HolidaysRequested />
            )}
            {router.asPath === "/admin?filter=mileage" && <MilageRequested />}
            {router.asPath === "/admin?filter=expense" && <ExpensesRequested />}
            {router.asPath.includes("/admin?history") && <History />}
          </div>
        </div>
      </div>
    </div>
  );
}
