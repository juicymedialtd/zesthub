import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import {
  MapContainer,
  TileLayer,
  withLeaflet,
  MapControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Routing from "../Routing";

export default function AddMileage() {
  const [reason, setReason] = useState();
  const [start, setStart] = useState();
  const [input, setInput] = useState([
    {
      postcode: "",
    },
  ]);

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

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Add a new trip</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-12 ">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
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

              <div className="flex flex-row mt-4 space-y-3 gap-4 h-72">
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

                <div className="w-1/2">
                  <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Routing />
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
