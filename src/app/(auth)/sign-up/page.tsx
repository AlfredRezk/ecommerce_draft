import { Card } from '@/components/ui/card'
import SignUpForm from './sign-up-form'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'

export default async function SignupPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <section className='h-full w-full flex justify-center items-center py-36'>
      <Card className='container mx-auto p-0 flex rounded-lg overflow-hidden shadow-lg flex-col lg:flex-row'>
        <div className=' w-full lg:flex-1 p-10'>
          <h1 className='font-bold text-2xl'>Sign Up</h1>
          <SignUpForm />
        </div>
        <div className='w-full lg:flex-1 flex'>
          <img src='/images/login2.webp' className='w-full h-full' />
        </div>
      </Card>
    </section>
  )
}
