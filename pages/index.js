import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  CashIcon,
  GlobeIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState();

  async function CalendarData() {
    const res = await fetch("/api/calendar/get").then((res) => res.json());
    const holidays = res.holidays;

    setEvents(holidays);
  }

  async function getStats() {
    const res = await fetch("/api/user/stats").then((res) => res.json());
    setData(res.holidayCount);
  }

  useEffect(() => {
    CalendarData();
    getStats();
  }, []);

  const cards = [
    {
      name: "Expenses submitted",
      href: "/expenses",
      icon: CashIcon,
      amount: "£0.00",
    },
    {
      name: "Miles submitted",
      href: "/miles",
      icon: LocationMarkerIcon,
      amount: "0",
    },
    {
      name: "Holidays Left",
      href: "/holidays",
      icon: GlobeIcon,
      amount: data !== undefined ? data.holidaysLeft : "",
    },
  ];

  return (
    <>
      <div className="mt-6">
        <h2 className="text-2xl leading-6 font-bold text-white">Overview</h2>
        
      </div>
    </>
  );
}
