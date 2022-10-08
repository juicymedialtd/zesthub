import dynamic from "next/dynamic";

const Milage = dynamic(() => import("../../components/AddMilage"), {
  ssr: false,
});

export default function NewTrip() {
  return (
    <>
      <Milage />
    </>
  );
}
