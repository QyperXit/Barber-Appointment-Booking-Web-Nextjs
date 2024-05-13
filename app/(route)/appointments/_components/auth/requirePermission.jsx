import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function RequirePermission({ children, permission }) {
  const { getPermission } = getKindeServerSession();
  const reqPermission = await getPermission(permission);

  if (!reqPermission || !reqPermission.isGranted) {
    redirect("/");
  } else {
    return children;
  }
}
