'use server'

import { formatError, round2 } from '../utils'
import { AVALIABLE_DELIVERY_DATES } from '@/lib/constants'

import Order, { IOrder } from '@/lib/models/Order'
// import { paypal } from '../paypal'
// import { revalidatePath } from 'next/cache'
import { connectDB } from '../db'
import { auth } from '../../../auth'
import {
  CartSchema,
  OrderItemSchema,
  OrderSchema,
  ShippingAddressSchema,
} from '../validators'
import { z } from 'zod'

// CREATE
export const createOrder = async (
  clientSideCart: z.infer<typeof CartSchema>,
) => {
  try {
    await connectDB()
    const session = await auth()
    if (!session) throw new Error('User not authenticated')
    // recalculate price and delivery date on the server
    const createdOrder = await createOrderFromCart(
      clientSideCart,
      session.user.id!,
    )
    return {
      success: true,
      message: 'Order placed successfully',
      data: { orderId: createdOrder._id.toString() },
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export const createOrderFromCart = async (
  clientSideCart: z.infer<typeof CartSchema>,
  userId: string,
) => {
  const cart = {
    ...clientSideCart,
    ...calcDeliveryDateAndPrice({
      items: clientSideCart.items,
      shippingAddress: clientSideCart.shippingAddress,
      deliveryDateIndex: clientSideCart.deliveryDateIndex,
    }),
  }

  const order = OrderSchema.parse({
    user: userId,
    items: cart.items,
    shippingAddress: cart.shippingAddress,

    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
    expectedDeliveryDate: cart.expectedDeliveryDate,
  })
  return await Order.create(order)
}
export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  deliveryDateIndex?: number
  items: z.infer<typeof OrderItemSchema>[]
  shippingAddress?: z.infer<typeof ShippingAddressSchema>
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )
  const deliveryDate =
    AVALIABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVALIABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ]

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0
      : deliveryDate.shippingPrice

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.08)
  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0),
  )
  return {
    AVALIABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVALIABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}

export async function getOrderById(orderId: string): Promise<IOrder> {
  await connectDB()
  const order = await Order.findById(orderId)
  return JSON.parse(JSON.stringify(order))
}

// export async function createPayPalOrder(orderId: string) {
//   console.log('CREATE PAYPAL ORDER')
//   await connectDB()
//   try {
//     const order = await Order.findById(orderId)
//     console.log(order)
//     if (order) {
//       const paypalOrder = await paypal.createOrder(order.totalPrice)
//       order.paymentResult = {
//         id: paypalOrder.id,
//         email_address: '',
//         status: '',
//         pricePaid: '0',
//       }
//       await order.save()
//       return {
//         success: true,
//         message: 'PayPal order created successfully',
//         data: paypalOrder.id,
//       }
//     } else {
//       throw new Error('Order not found')
//     }
//   } catch (err) {
//     return { success: false, message: formatError(err) }
//   }
// }

// export async function approvePayPalOrder(
//   orderId: string,
//   data: { orderID: string },
// ) {
//   await connectDB()
//   try {
//     const order = await Order.findById(orderId).populate('user', 'email')
//     if (!order) throw new Error('Order not found')

//     const captureData = await paypal.capturePayment(data.orderID)
//     if (
//       !captureData ||
//       captureData.id !== order.paymentResult?.id ||
//       captureData.status !== 'COMPLETED'
//     )
//       throw new Error('Error in paypal payment')
//     order.isPaid = true
//     order.paidAt = new Date()
//     order.paymentResult = {
//       id: captureData.id,
//       status: captureData.status,
//       email_address: captureData.payer.email_address,
//       pricePaid:
//         captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
//     }
//     await order.save()
//     await sendPurchaseReceipt({ order })
//     revalidatePath(`/account/orders/${orderId}`)
//     return {
//       success: true,
//       message: 'Your order has been successfully paid by PayPal',
//     }
//   } catch (err) {
//     return { success: false, message: formatError(err) }
//   }
// }
