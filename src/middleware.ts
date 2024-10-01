import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "../auth";

export const config = {
    matcher: [
      '/',
      '/catalog/:path*',
      '/dashboard/:path*',
      '/my-cart/:path*',
      '/my-profile/:path*',
      '/my-favorite/:path*',
      '/login',
      '/register',
      '/reset-password',
      '/reset-password-request',
      '/set-password',
    ],
  }

export default auth( async (request : NextRequest) => {
  const reqUrl = new URL(request.url)
  const path = reqUrl.pathname

    const session = await auth();
    const publicRoutes = ['/', '/login', '/register', '/catalog','/reset-password', '/reset-password-request', '/set-password',]
    const adminRoutes = [
        '/dashboard'
    ]
    const customerRoutes = [                                                                                                                                                                                     
        '/my-cart',
        '/my-profile',
        '/my-favorite',
      ]

    if (publicRoutes.includes(path)) {
        return NextResponse.next()
      }

    if(!session){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // @ts-ignore
    const userRole = session.user?.role;
        
    if (userRole === "SUPER" || userRole === "ADMIN" ) {
        if (!adminRoutes.includes(path)) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
            }
    }

    if(userRole === "CUSTOMER"){
        if(!customerRoutes.includes(path)){
            return NextResponse.redirect(new URL("/", request.url));
        }
    }   

    return NextResponse.next();
  }
)

