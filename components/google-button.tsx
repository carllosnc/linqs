"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  function loginWithGoogle() {
    const supabase = createClient()

    supabase.auth.signInWithOAuth({
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
      provider: 'google',
    })
  }

  return (
    <Button
      size="default"
      className="flex gap-[10px]"
      variant="outline"
      type="button"
      onClick={loginWithGoogle}>
      <FcGoogle className="w-7 h-7" />
      Sign in with Google
    </Button>
  )
}