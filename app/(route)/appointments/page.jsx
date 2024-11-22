import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Admin from "./_components/Admin";

const UNAUTHORIZED_REDIRECT = "/";

export const runtime = "edge"; // Optional: Enable edge runtime for better performance

async function isAuthorizedAdmin(userId) {
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;

  if (!adminId) {
    console.error("Admin ID environment variable is not configured");
    return false;
  }

  return userId === adminId;
}

export default async function AppointmentsPage() {
  // Get user and handle authentication
  const user = await currentUser();

  if (!user) {
    redirect(UNAUTHORIZED_REDIRECT);
  }

  // Check admin authorization
  const isAdmin = await isAuthorizedAdmin(user.id);

  if (!isAdmin) {
    redirect(UNAUTHORIZED_REDIRECT);
  }


  return (
      <div className="min-h-screen">
        <Admin />
      </div>
  );
}