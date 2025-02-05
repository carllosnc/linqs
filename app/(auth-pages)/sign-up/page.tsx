import { signUpAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AuthTitle,
  AuthSubtitle,
  AuthHeader,
  AuthContent,
  AuthCard,
  AuthContainer
} from "@/components/auth";

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <AuthContainer>
      <AuthCard>
        <form className="flex-1 flex flex-col gap-[20px]">
          <AuthHeader>
            <AuthTitle> Create your account </AuthTitle>
            <AuthSubtitle text="Already have an account?" linkTitle="Sign in" href="/sign-in" />
          </AuthHeader>

          <AuthContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
            </div>

            <div>
              <SubmitButton formAction={signUpAction} pendingText="Signing up...">
                Sign up
              </SubmitButton>
            </div>

            <FormMessage message={searchParams} />
          </AuthContent>
        </form>
      </AuthCard>
    </AuthContainer>
  )
}
