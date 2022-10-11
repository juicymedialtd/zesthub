import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const Routing = ({ waypoints, setDistance }) => {
  const map = useMap();

  useEffect(() => {
    if (map === null) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      containerClassName: "hidden",
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      // alert distance and time in km and minutes
      // alert(
      //   "Total distance is " +
      //     summary.totalDistance / 1000 +
      //     " km and total time is " +
      //     Math.round((summary.totalTime % 3600) / 60) +
      //     " minutes"
      // );
      setDistance(summary.totalDistance / 1000)
    });

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

export default Routing;
