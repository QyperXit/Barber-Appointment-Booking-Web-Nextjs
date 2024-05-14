// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import Admin from "./_components/Admin";

const Appointments = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const requiredPermission = await getPermission("admin:true");
  if (!requiredPermission.isGranted) {
    redirect("/");
  }

  return <Admin />;
};

export default Appointments;
