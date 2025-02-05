import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AuthTitle,
  AuthSubtitle,
  AuthHeader,
  AuthContent,
  AuthCard,
  AuthContainer
} from "@/components/auth";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {

  const searchParams = await props.searchParams;

  return (
    <AuthContainer>
      <AuthCard>
        <form className="flex-1 flex flex-col gap-[20px]">
          <AuthHeader>
            <AuthTitle> Sign in </AuthTitle>
            <AuthSubtitle
              text="Don't have an account?"
              linkTitle="Sign up"
              href="/sign-up"
            />
          </AuthHeader>

          <AuthContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="w-full min-w-full"
                type="password"
                name="password"
                placeholder="Your password"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                  Sign in
                </SubmitButton>
              </div>
              <Link
                className="link-color text-sm"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <FormMessage message={searchParams} />
          </AuthContent>

        </form>
      </AuthCard>
    </AuthContainer>
  );
}
