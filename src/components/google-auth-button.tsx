import { signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button"

export function GoogleAuthButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", {redirectTo: "/"})
      }}
    >
      <Button variant="outline"  type="submit" className="flex items-center gap-2">
        <FcGoogle />
        Sign in with Google
      </Button>
    </form>
  )
}