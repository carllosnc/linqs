"use client"

import { LogoVertical } from '@/components/logo'
import { GoogleButton } from '@/components/google-button'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function SignIn(props: any) {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    let message: string[] = []
    let errorDescription: string = ""

    if (window.location.href.split("#")[1]) {
      message = window.location.href.split("#")[1].split("&")
      errorDescription = message[2].split("=")[1].replaceAll("+", " ")
      setDescription(errorDescription)
    }
  }, []);

  return (
    <main className="w-full justify-center gap-[40px] bg-neutral-50 py-[30px] dark:bg-neutral-950 min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-[10px] items-center">
        <LogoVertical className="fill-black max-w-[150px] h-auto dark:fill-white" />
        <h2 className="title-color text-color text-[18px]">Do login to continue.</h2>
      </div>
      <GoogleButton />
      <Link href="/" className="link-color">
        Back to home →
      </Link>

      {
        description &&
        <div className="text-center text-red-800 bg-red-100 px-4 py-2">
          {description}
        </div>
      }
    </main>
  )
}