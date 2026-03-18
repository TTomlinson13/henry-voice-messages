import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Second Brain"' },
  });
}

export function middleware(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;

  if (!user || !pass) {
    return new NextResponse(
      "Server auth not configured. Set BASIC_AUTH_USER and BASIC_AUTH_PASS.",
      { status: 500 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const base64 = auth.split(" ")[1] || "";
  const decoded = atob(base64);
  const [incomingUser, ...rest] = decoded.split(":");
  const incomingPass = rest.join(":");

  if (incomingUser !== user || incomingPass !== pass) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
