import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export function proxy(
  request: NextRequest
) {

  const sessionCookie =
    getSessionCookie(request);


  const { pathname } =
    request.nextUrl;



  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");



  const protectedRoutes = [
    "/dashboard",
    "/goals",
    "/assessment",
    "/roadmap",
    "/sessions",
    "/reflection",
    "/analytics",
    "/settings",
    "/voice",
    "/companion",
    "/practice",
    "/projects",
  ];



  const isProtectedRoute =
    protectedRoutes.some(
      (route)=>
        pathname.startsWith(route)
    );



  if(
    !sessionCookie &&
    isProtectedRoute
  ){

    return NextResponse.redirect(
      new URL(
        "/sign-in",
        request.url
      )
    );

  }



  if(
    sessionCookie &&
    isAuthPage
  ){

    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );

  }



  return NextResponse.next();

}



export const config = {

  matcher:[
    "/dashboard/:path*",
    "/goals/:path*",
    "/assessment/:path*",
    "/roadmap/:path*",
    "/sessions/:path*",
    "/reflection/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/voice/:path*",
    "/companion/:path*",
    "/practice/:path*",
    "/projects/:path*",
    "/sign-in",
    "/sign-up",
  ],

};