'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserSignInSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import Link from 'next/link'

import { redirect, useSearchParams } from 'next/navigation'
import InputField from '@/components/InputField'
import {
  signInWithCredentials,
  SignInWithGoogle,
} from '@/lib/actions/user.actions'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import toast from 'react-hot-toast'
import { useFormStatus } from 'react-dom'
const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: 'admin@example.com',
        password: '123456',
      }
    : {
        email: '',
        password: '',
      }

export default function SignInForm() {
  const searchParams = useSearchParams()
  const { pending } = useFormStatus()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<z.infer<typeof UserSignInSchema>>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof UserSignInSchema>) {
    try {
      await signInWithCredentials({
        email: values.email,
        password: values.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      console.log(error)
      if (isRedirectError(error)) throw error

      toast.error('Invalid email or password')
    }
  }

  return (
    <div className='flex flex-col gap-6 mt-5 w-full'>
      <div className='flex flex-col gap-5 w-full lg:flex-row '>
        <form action={SignInWithGoogle} className='flex lg:flex-1 gap-2 '>
          <Button
            variant='outline'
            className='w-full'
            size='lg'
            disabled={pending}
          >
            <FcGoogle size={26} />
            <span className='text-base'>Sign in with Google</span>
          </Button>
        </form>
        <Button
          variant='outline'
          className='flex lg:flex-1 gap-2 cursor-pointer'
          size='lg'
        >
          <FaFacebook size={26} color='#0866FF' />
          <span className='text-base'>Sign in with Facebook</span>
        </Button>
      </div>
      <div className='flex justify-center items-center gap-5'>
        <div className='flex-1 h-[1px] bg-gray-300'></div>
        <div className='text-muted-foreground text-lg'>or</div>
        <div className='flex-1 h-[1px] bg-gray-300'></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <input type='hidden' name='callbackUrl' value={callbackUrl} />
          <InputField
            form={form}
            label='Email'
            name='email'
            placeholder='john.doe@email.com'
            type='text'
          />
          <InputField
            form={form}
            label='Password'
            name='password'
            placeholder='******'
            type='password'
          />
          <div className='text-center'>
            <Button variant='link' asChild>
              <Link href='/auth/forgot' className='text-base font-semibold'>
                Forgot password?
              </Link>
            </Button>
          </div>
          <Button className='w-full rounded-lg text-base'>
            Sign in to your account
          </Button>
        </form>
        <div className='flex items-center'>
          <p className='text-muted-foreground'>Don&apos;t have an account?</p>
          <Button variant='link' asChild className='pl-1'>
            <Link
              href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className='text-base font-semibold'
            >
              Sign up
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  )
}
