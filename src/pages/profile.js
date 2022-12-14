import { useRouter } from "next/router";
import ResetPasswordModal from "../components/ResetPasswordModal";
import ProfilePage from "../views/profile";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserProfile() {
  const router = useRouter();

  const tabs = [
    {
      name: "General",
      href: "/settings",
      current: router.asPath === "/profile",
    },
  ];
  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="p-4">
          <div className="p-4">
            <h1 className="text-white text-3xl font-bold">Profile</h1>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-gray-200">
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
                  <ResetPasswordModal />
                </nav>
              </div>
            </div>
          </div>

          <div>
            {router.asPath === '/profile' && <ProfilePage />}
          </div>
        </div>
      </div>
    </div>
  );
}
