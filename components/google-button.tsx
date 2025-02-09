"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  function loginWithGoogle() {
    const supabase = createClient()

    supabase.auth.signInWithOAuth({
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
      provider: 'google',
    })
  }

  return (
    <Button className="flex gap-[10px]" variant="outline" type="button" onClick={loginWithGoogle}>
      <FcGoogle className="w-5 h-5" />
      Sign in with Google
    </Button>
  )
}