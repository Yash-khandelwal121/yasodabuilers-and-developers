'use client'

import { useState, useEffect } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasEnv, setHasEnv] = useState(true)

  useEffect(() => {
    // Check if the public environment variables exist
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      setHasEnv(false)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-charcoal-900">
          Yasoda Builders CMS
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your website content
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {!hasEnv ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-[2px] text-center">
              <h3 className="text-red-800 font-bold mb-2">Supabase is not configured yet.</h3>
              <p className="text-red-600 text-sm">
                Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file and restart the server.
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-[2px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-forest-800 focus:border-forest-800 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-[2px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-forest-800 focus:border-forest-800 sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-[2px]">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[2px] shadow-sm text-sm font-medium text-white bg-forest-800 hover:bg-forest-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'AUTHENTICATING...' : 'LOGIN TO ADMIN'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
