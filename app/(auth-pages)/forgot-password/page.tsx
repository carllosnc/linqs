import { forgotPasswordAction } from "@/app/actions";
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

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <AuthContainer>
      <AuthCard>
        <form className="flex-1 flex flex-col gap-[20px]">
          <AuthHeader>
            <AuthTitle>Reset Password</AuthTitle>
            <p className="text-color text-sm">
              Enter your email address and we will send you a link to reset your password.
            </p>
          </AuthHeader>

          <AuthContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div>
              <SubmitButton formAction={forgotPasswordAction}>
                Reset Password
              </SubmitButton>
            </div>
            <FormMessage message={searchParams} />
          </AuthContent>

          <AuthSubtitle
            text="Don't have an account?"
            linkTitle="Sign up"
            href="/sign-up"
          />
        </form>
      </AuthCard>
    </AuthContainer>
  );
}
