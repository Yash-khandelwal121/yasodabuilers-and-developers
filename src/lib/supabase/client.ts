import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from './env'

export function createClient() {
  const env = getSupabaseEnv()
  
  if (!env) {
    // Return a proxy/dummy that avoids crashing the UI but doesn't actually work
    // Or just create a dummy client if we really want to, but it's safer to return null 
    // or let the UI handle it. We will return a non-crashing mock if env is missing to prevent page crash.
    console.warn('Supabase environment variables are missing.')
    // Note: returning null will break typed code expecting a Supabase client.
    // Instead we can initialize it with dummy values strictly for the browser client so it doesn't crash on load, 
    // but any actual request will fail (which is fine, we handle that in UI).
    return createBrowserClient(
      'https://placeholder-project.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder-key'
    )
  }

  return createBrowserClient(env.url, env.key)
}
