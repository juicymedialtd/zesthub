import { useEffect } from "react";
import L, { routing } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const Routing = ({ waypoints }) => {
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

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

export default Routing;
