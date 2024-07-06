import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/Auth.action";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const publicRoutes = ["/signup", "/signin"];
  // console.log(re)
  if (!publicRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
