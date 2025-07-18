'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

const ResetTokenPage = () => {
  const params = useParams() as { token: string }
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await axios.post('/api/auth/reset-password', {
        token: params.token,
        password,
      })

      toast.success(res.data.message || 'Password updated!')
      router.push('/login')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || 'Reset failed or token expired'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 p-4">
      <h1 className="text-2xl font-bold">Set New Password</h1>
      <form onSubmit={handleReset} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="password"
          placeholder="New password"
          className="p-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="p-2 border rounded-lg"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  )
}

export default ResetTokenPage