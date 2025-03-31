import SignInForm from '@/app/(auth)/sign-in/sign-in-form'
import { Card } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import { auth } from '../../../../auth'

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams

  const { callbackUrl } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <section className='h-full w-full flex justify-center items-center py-36'>
      <Card className='container mx-auto p-0 flex rounded-lg overflow-hidden shadow-lg flex-col lg:flex-row'>
        <div className=' w-full lg:flex-1 p-10'>
          <h1 className='font-bold text-2xl'>Welcome back</h1>
          <SignInForm />
        </div>
        <div className='w-full lg:flex-1 flex -order-2'>
          <img src='/images/login2.webp' className='w-full h-full' />
        </div>
      </Card>
    </section>
  )
}
