"use client"

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

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
    <Button variant="outline" type="button" onClick={loginWithGoogle}>
      Sign in with Google
    </Button>
  )
}