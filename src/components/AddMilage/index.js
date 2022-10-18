import { useEffect, useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { MapContainer, TileLayer } from "react-leaflet";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import "leaflet-routing-machine";
import { useRouter } from "next/router";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Routing from "../Routing";

export default function AddMileage() {
  const router = useRouter();

  const [reason, setReason] = useState();
  const [start, setStart] = useState();
  const [input, setInput] = useState([
    {
      postcode: "",
    },
  ]);
  const [waypoints, setWaypoints] = useState([
    // L.latLng(53.522516, -2.492623),
    // L.latLng(53.513342, -2.443597),
    // L.latLng(53.472857, -2.299675),
  ]);
  const [distance, setDistance] = useState();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function addInput() {
    let newfield = { postcode: "" };

    setInput([...input, newfield]);
  }

  function handleInput(index, event) {
    let data = [...input];
    data[index][event.target.name] = event.target.value;
    setInput(data);
  }

  // Loop over postcode array & find latLong for each postcode, update waypoint array with LatLong
  async function calculateLatLong() {
    const data = [start];

    for (let i = 0; i < input.length; i++) {
      data.push(input[i].postcode);
    }

    await fetch("https://api.postcodes.io/postcodes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postcodes: data,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const result = res.result;

        const waypoints = [];

        result.map((item) => {
          if (item.result !== null) {
            waypoints.push(
              L.latLng(item.result.latitude, item.result.longitude)
            );
          }
        });

        setWaypoints(waypoints);
      });
  }

  async function submitMiles() {
    const miles = distance * 0.621371;

    await fetch("/api/mileage/new-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason,
        start,
        stops: input,
        miles,
      }),
    })
      // .then((res) => res.json())
      // .then((res) => router.push("/mileage"));
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'gbp',
  });


  const asyncFunctionDebounced = AwesomeDebouncePromise(calculateLatLong, 1500);

  useEffect(() => {
    asyncFunctionDebounced();
  }, [input, start]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-12 ">
          <div className="bg-[#0F2649] p-4 rounded-t-md">
            <div className="flex flex-row justify-between">
              <h1 className="text-white text-3xl font-bold">
                {distance !== undefined
                  ? (distance * 0.621371).toFixed(2)
                  : "0"}{" "}
                Miles / Cost of trip ={" "}
                {distance !== undefined
                  ? formatter.format((distance * 0.621371).toFixed(2) * 0.45)
                  : "0"}
              </h1>

              <button
                onClick={() => submitMiles()}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary  sm:w-auto"
              >
                Submit Requst
              </button>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-900 font-bold"
                >
                  Reason for trip
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full border-gray-900 shadow-sm border-2 rounded-md sm:text-sm"
                    placeholder="Type your reason here"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row mt-4 space-y-3 gap-4 min-h-[60vh]">
                <div className=" flex-col w-1/2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-900"
                  >
                    Start Destination
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="m50 2st"
                      onChange={(e) => setStart(e.target.value)}
                    />
                  </div>

                  {input.map((input, index) => {
                    return (
                      <div key={index} className="mt-4">
                        <input
                          type="text"
                          name="postcode"
                          id="postcode"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="m50 2st"
                          onChange={(event) => handleInput(index, event)}
                        />
                      </div>
                    );
                  })}

                  <div className="mt-2 flex justify-center">
                    <PlusIcon className="h-6 w-6" onClick={addInput} />
                  </div>
                </div>

                <div className="w-full">
                  <MapContainer
                    center={[51.805, -2]}
                    zoom={7}
                    zoomAnimation="false"
                    style={{ height: "100%", width: "100%", padding: 0 }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {waypoints !== undefined && waypoints.length > 1 && (
                      <Routing
                        waypoints={waypoints}
                        setDistance={setDistance}
                      />
                    )}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
