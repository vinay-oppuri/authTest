'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Image from 'next/image'
import ProfilePopover from './profilePopover'
import MobileSidebar from './mobileSidebar'
import BottomNav from './bottomNavbar'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      {/* Top Navbar */}
      <nav className='bg-background text-foreground fixed top-0 left-0 right-0 flex items-center justify-between p-5 z-50 shadow-sm border-b border-border'>
        <Link href='/' className='text-lg font-semibold' onClick={() => setIsOpen(false)}>
          <Image
            className="w-30 sm:w-40 md:w-44 lg:w-48 dark:invert"
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={38}
            priority
          />

        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-4'>
          <Link href='/'>Home</Link>
          <Link href='#'>About</Link>
          <Link href='#'>Contact</Link>
        </div>

        <div className="flex items-center gap-2 md:mr-10">
          {session ? (
            <ProfilePopover />
          ) : (
            <Button className='rounded-full p-4'>
              <Link href="/auth/login">Get Started</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <div className="md:hidden">
            <MobileSidebar />
          </div>
        </div>
        <BottomNav/>
      </nav>
    </>
  )
}

export default Navbar