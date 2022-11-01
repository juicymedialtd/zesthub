import { useState, useEffect } from "react";
import {
  CheckIcon,
  HandIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import { format, parseISO } from "date-fns";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminUserProfile({ user }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [show, setShow] = useState('hol')

  async function userDetails() {
    const res = await fetch(`/api/v1/admin/users/${user}/details`).then((res) =>
      res.json()
    );
    setProfile(res.user);
    setLoading(false);
  }

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div className="py-4">
      {!loading && (
        <>
          {profile !== undefined && (
            <main className="">
              {/* Page header */}
              <div className="md:flex md:items-center md:justify-between md:space-x-5 px-4">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {profile.profileUrl ? (
                        <img
                          className="h-16 w-16 rounded-full"
                          src={`${process.env.NEXT_PUBLIC_S3}/${profile.profileUrl}`}
                          alt=""
                        />
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                          <span className="text-xs font-medium leading-none text-white">
                            {profile.name[0]}
                          </span>
                        </span>
                      )}
                      <span
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {profile.name}
                    </h1>
                    <p className="text-sm font-medium text-white">
                      Profile created on:
                      <time
                        dateTime={format(
                          parseISO(profile.createdAt),
                          "dd/MM/yyyy"
                        )}
                      >
                        {" "}
                        {format(parseISO(profile.createdAt), "dd/MM/yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    Disqualify
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    Advance to offer
                  </button>
                </div>
              </div>

              <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2
                          id="applicant-information-title"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Users History & Information
                        </h2>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                >
                                  Created By
                                </th>

                                <th
                                  scope="col"
                                  className="hidden px-3 py-2 text-right text-sm font-semibold lg:table-cell"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="hidden px-3 py-2 text-right text-sm font-semibold lg:table-cell"
                                >
                                  Start Date
                                </th>
                                <th
                                  scope="col"
                                  className="hidden px-3 py-2 text-right text-sm font-semibold sm:table-cell"
                                >
                                  End Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-2 text-right text-sm font-semibold"
                                >
                                  Days Used
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {profile.holidays.map((item) => (
                                <tr key={item.id}>
                                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {item.type}
                                    <dl className="font-normal lg:hidden">
                                      <dt className="sr-only">Title</dt>
                                      <dd className="mt-1 truncate text-gray-700">
                                        {item.status}
                                      </dd>
                                      <dd className="mt-1 truncate text-gray-700">
                                        {format(
                                          parseISO(item.startDate),
                                          "dd/MM/yyyy"
                                        )}
                                      </dd>
                                      <dt className="sr-only sm:hidden">
                                        Email
                                      </dt>
                                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                        {format(
                                          parseISO(item.endDate),
                                          "dd/MM/yyyy"
                                        )}
                                      </dd>
                                    </dl>
                                  </td>
                                  <td className="hidden text-right px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {item.status}
                                  </td>
                                  <td className="hidden text-right px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {format(
                                      parseISO(item.startDate),
                                      "dd/MM/yyyy"
                                    )}
                                  </td>
                                  <td className="px-3 text-right py-4 text-sm text-gray-500">
                                    {format(
                                      parseISO(item.endDate),
                                      "dd/MM/yyyy"
                                    )}
                                  </td>
                                  <td className="px-3 text-right py-4 text-sm text-gray-500">
                                    {item.daysUsed}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <section
                  aria-labelledby="timeline-title"
                  className="lg:col-span-1 lg:col-start-3"
                >
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2
                      id="timeline-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Timeline
                    </h2>

                    {/* Activity Feed */}
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {timeline.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== timeline.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      item.type.bgColorClass,
                                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                    )}
                                  >
                                    <item.type.icon
                                      className="h-5 w-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {item.content}{" "}
                                      <a
                                        href="#"
                                        className="font-medium text-gray-900"
                                      >
                                        {item.target}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>
                                      {item.date}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="justify-stretch mt-6 flex flex-col">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Advance to offer
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          )}
        </>
      )}
    </div>
  );
}
