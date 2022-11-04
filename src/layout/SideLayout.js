import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
  CashIcon,
  TruckIcon,
  SunIcon,
  AdjustmentsIcon,
  DocumentIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import FeedbackModel from "../components/Feedback";
import ShortCut from "../components/Shortcuts";

import Lottie from "react-lottie-player";

import lottie from "../../public/nav.json";

const userNavigation = [{ name: "Your Profile", href: "/profile" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideLayout({ children }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageName, setPageName] = useState("");

  const { data: session, status } = useSession();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      current: router.pathname === "/",
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: CalendarIcon,
      current: router.pathname === "/calendar",
    },
    {
      name: "Holidays",
      href: "/holidays",
      icon: SunIcon,
      current: router.pathname === "/history",
    },
    {
      name: "Milage",
      href: "/mileage",
      icon: TruckIcon,
      current: router.pathname.includes("/mileage"),
    },
    {
      name: "Expenses",
      href: "/expenses",
      icon: CashIcon,
      current: router.pathname.includes("/expense"),
    },
    {
      name: "Documents",
      href: "/documents",
      icon: DocumentIcon,
      current: router.pathname.includes("/documents"),
    },
    // {
    //   name: "Wiki",
    //   href: "/wiki",
    //   icon: PencilIcon,
    //   current: router.pathname.includes("/wiki"),
    // },
  ];

  function setHeader() {
    const path = router.pathname;
    if (path === "/") {
      setPageName("Dashboard");
    } else if (path.includes("/calendar")) {
      setPageName("Calendar");
    } else if (path.includes("/history")) {
      setPageName("Holidays");
    } else if (path.includes("/mileage")) {
      setPageName("Milage");
    } else if (path.includes("/expense")) {
      setPageName("Expenses");
    } else if (path.includes("/documents")) {
      setPageName("Documents");
    } else if (path.includes("/wiki")) {
      setPageName("Wiki");
    } else if (path.includes("/holidays")) {
      setPageName("Holidays");
    }
  }

  useEffect(() => {
    setHeader();
  }, [router]);

  return (
    <div className="min-h-screen">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-nav-bg">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="w-auto"
                    src="/zest-draft-logo.svg"
                    alt="logo"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-amber-300 text-gray-900"
                            : "text-white hover:bg-amber-300 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-900"
                              : "text-amber-300 group-hover:text-white",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex flex-shrink-0 p-4">
                  {session.user.role === "ADMIN" && (
                    <div className="w-full space-y-2">
                      <a
                        href="/admin"
                        className={classNames(
                          router.pathname === "/admin"
                            ? "bg-amber-300 text-gray-900"
                            : "text-white hover:bg-amber-300 hover:text-white",
                          "group flex items-center px-2 py-2 text-md font-bold rounded-md w-full"
                        )}
                      >
                        <AdjustmentsIcon
                          className={classNames(
                            router.pathname === "/admin"
                              ? "text-gray-900"
                              : "text-amber-300 group-hover:text-white",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        Admin
                      </a>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-nav-bg ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 py-4">
            <div className="h-18 w-auto mx-auto">
              <Lottie loop={false} animationData={lottie} play />
            </div>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-amber-300 text-gray-900"
                      : "text-white hover:bg-amber-300 hover:text-gray-800",
                    "group flex items-center px-2 py-2 text-md font-bold rounded-md align-middle"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-900"
                        : "text-amber-300 group-hover:text-gray-800",
                      "mr-3 flex-shrink-0 h-6 w-6 mb-1"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-shrink-0 p-4">
          {session.user.role === "ADMIN" && (
            <div className="w-full space-y-2">
              <a
                href="/admin"
                className={classNames(
                  router.pathname === "/admin"
                    ? "bg-amber-300 text-gray-900"
                    : "text-white hover:bg-amber-300 hover:text-white",
                  "group flex items-center px-2 py-2 text-md font-bold rounded-md w-full"
                )}
              >
                <AdjustmentsIcon
                  className={classNames(
                    router.pathname === "/admin"
                      ? "text-gray-900"
                      : "text-amber-300 group-hover:text-white",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                Admin
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 min-h-screen md:pl-64">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-topnav-bg">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h1 className="text-3xl font-bold text-white p-3">{pageName}</h1>
              {/* <ShortCut /> */}
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                {/* <div>
                  <Menu.Button className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-secondary">
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div> */}

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
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
                            Request Leave
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
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
                            Submit Mileage
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
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
                            Submit Expense
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* <button
                type="button"
                className="bg-white p-2 rounded-full text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-4 w-4" aria-hidden="true" />
              </button> */}
              {/* Profile dropdown */}
              {/* <img src="/desk.svg" className="h-28 w-auto" /> */}
              <FeedbackModel />
              <Menu as="div" className="ml-3 relative z-40">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Open user menu</span>
                    {session.user.profile ? (
                      <img
                        className="inline-block h-8 w-8 rounded-full"
                        src={`${process.env.NEXT_PUBLIC_S3}/${session.user.profile}`}
                        alt="profilepic"
                      />
                    ) : (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                        <span className="text-sm font-medium leading-none text-white">
                          {session.user.name[0].toLocaleUpperCase()}
                        </span>
                      </span>
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          type="button"
                          onClick={() => signOut()}
                          className={classNames(
                            active ? "bg-gray-100 cursor-pointer" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign Out
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="flex-1 relative z-0 focus:outline-none overflow-y-auto bg-main-bg bg-pattern">
          <>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
              <>{children}</>
            </div>
          </>
        </main>
      </div>
    </div>
  );
}
