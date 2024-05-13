import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    // redirect('/api/auth/login')
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/", request.url)
    );
  }

  // const requiredPermission = await getPermission("admin:true"); // Assuming permission format
  // if (!requiredPermission.isGranted) {
  //   // Redirect to a specific page or handle unauthorized access
  //   const url = new URL("/", request.url); // Adjust redirect URL
  //   return NextResponse.redirect(url);
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/details/:path*", "/appointments/:path*"],
};
