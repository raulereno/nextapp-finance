import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/personal", "/company"],
};
