import { notFound } from 'next/navigation'
import React from 'react'

import { getOrderById } from '@/lib/actions/order.actions'
import PaymentForm from './payment-form'
import Stripe from 'stripe'
import { auth } from '../../../../../auth'
// import Stripe from 'stripe'

export const metadata = {
  title: 'Payment',
}

const CheckoutPaymentPage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const params = await props.params

  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  let client_secret = null
  if (!order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'USD',
      metadata: { orderId: order._id },
    })
    client_secret = paymentIntent.client_secret
  }

  return (
    <PaymentForm
      clientSecret={client_secret}
      order={order}
      isAdmin={session?.user?.role === 'Admin' || false}
    />
  )
}

export default CheckoutPaymentPage
