'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const SignUpPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { duration: 4000 })
      return
    }

    try {
      const res = await axios.post('/api/auth/signup', {
        username,
        email,
        password,
      })

      toast.success(res.data.message || 'Registered successfully', {
        duration: 4000,
      })

      router.push('/login')
    } catch  {
      toast.error('Registration Failed', { duration: 4000 })
    }
  }

  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      router.replace('/profile')
    }
  }, [session, router]) // ✅ included router in deps

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="w-[95%] max-w-md bg-card text-card-foreground shadow-lg rounded-lg p-6 sm:p-8 border border-border">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={onSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg border bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-primary text-primary-foreground hover:bg-opacity-90 transition"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline text-blue-600 dark:text-blue-400">      
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignUpPage