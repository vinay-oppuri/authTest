'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      if (res.error === 'CredentialsSignin') {
        toast.error('Invalid Email ID or Password')
      }
    } else {
      router.push('/profile')
      toast.success('Login Successful', { duration: 4000 })
    }
  }

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.user) {
      router.push('/profile')
    }
  }, [router, session])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-[95%] max-w-sm bg-card p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={onLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-ring"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-ring"
            required
          />

          <div className="text-right text-sm text-blue-600 dark:text-blue-400">
            <Link href="/reset">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="p-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 underline dark:text-blue-400">
            Sign Up
          </Link>
        </div>

        {/* --- Third Party Auth Buttons --- */}
        <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
          <button
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            className="hover:scale-105 transition p-2 rounded-lg bg-muted"
          >
            <img
              src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Google"
              className="w-7 h-7"
            />
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/profile' })}
            className="hover:scale-105 transition p-2 rounded-lg bg-muted"
          >
            <img
              src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
              alt="GitHub"
              className="w-7 h-7 dark:invert"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage