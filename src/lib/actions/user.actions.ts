'use server'
import { redirect } from 'next/navigation'
import { signIn, signOut } from '@/../auth'

import { UserSignUpSchema, UserSignInSchema } from '@/lib/validators'
import { connectDB } from '@/lib/db/index'
import User from '@/lib/models/User'
import bcrypt from 'bcryptjs'
import { formatError } from '../utils'
import { z } from 'zod'

export async function signInWithCredentials(
  user: z.infer<typeof UserSignInSchema>,
) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}

export const SignInWithGoogle = async () => {
  await signIn('google')
}
// CREATE
export async function registerUser(
  userSignUp: z.infer<typeof UserSignUpSchema>,
) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectDB()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })

    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}
