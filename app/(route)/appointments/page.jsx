import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Admin from "./_components/Admin";

const Appointments = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const loggedInUserId = user.id;
  const requiredUserId = process.env.NEXT_PUBLIC_ID;

  if (loggedInUserId !== requiredUserId) {
    redirect("/");
  }

  return <Admin />;
};

export default Appointments;
