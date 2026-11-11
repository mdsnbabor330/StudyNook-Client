import dns from 'node:dns';
dns.setServers(['8.8.8.8','8.8.4.4']);

import { NextResponse } from 'next/server'
import { headers } from 'next/headers';
import { auth } from './auth';

 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: ['/add-room','/my-listing','/my-bookings','/profile','/edit-room/:path*'],
}