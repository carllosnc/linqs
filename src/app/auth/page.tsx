import { Logo } from '@/components/logo'
import { GoogleAuthButton } from '@/components/google-auth-button'

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex lg:flex-col bg-white dark:bg-zinc-950">
      <div className="w-full min-h-screen max-w-[50%] lg:max-w-[100%] lg:min-h-[200px] bg-center bg-auth dark:bg-auth-dark bg-cover"/>

      <div className="w-full min-h-screen max-w-[50%] lg:min-h-min lg:max-w-[100%] flex justify-center items-center">
        <div className="w-full max-w-[600px] px-[10px] flex flex-col items-center gap-[30px] justify-center py-[60px]">
          <Logo className="relative top-[3px] w-[240px] h-auto fill-zinc-300 dark:fill-white" />
          <h1 className="text-zinc-600 text-[20px] dark:text-white">
            Welcoment to One Stack
          </h1>
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  )
}