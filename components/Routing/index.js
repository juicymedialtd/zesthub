import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

const createRoutineMachineLayer = (props) => {
 const i =  L.Routing.control({
    waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    draggableWaypoints: false,
    showAlternatives: false,
    show: false,
    containerClassName: 'hidden'
  });

  return i;
};

const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;
