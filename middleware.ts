import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
    function middleware(req: NextRequest) {
        const { pathname } = req.nextUrl
        const token = (req as any).nextauth?.token


        const authPages = ['/login', '/signup', '/reset']
        const protectedPages = ['/profile']

        if (token && authPages.includes(pathname)) {
            return NextResponse.redirect(new URL('/profile', req.url))
        }
        if (!token && protectedPages.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: () => true
        },
        pages: {
            signIn: '/login'
        }
    }
)


export const config = {
    matcher: [
        '/',    
        '/login',
        '/signup',
        '/reset',
        '/profile',
        '/api/:path*',
    ],
}
