import { useRouter } from "next/router";
import AdminAllHolidays from "./holidays";

// TODO -> Display all holiday requests for now for route ?history=holidays

export default function History() {
  const router = useRouter();

  return (
    <div>
      {router.asPath === "/admin?history=holidays" && <AdminAllHolidays />}
    </div>
  );
}
