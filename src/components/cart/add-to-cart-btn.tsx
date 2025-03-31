/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import useCartStore from '@/hooks/use-cart-store'
import { OrderItemSchema } from '@/lib/validators'

import toast from 'react-hot-toast'

import { z } from 'zod'

export default function AddToCart({
  item,
}: {
  item: z.infer<typeof OrderItemSchema>
  quantity?: number
}) {
  const { addItem } = useCartStore()

  return (
    <Button
      className='rounded-full w-full'
      type='button'
      onClick={async () => {
        try {
          await addItem(item, item.quantity)
          toast.success('Added to cart')
        } catch (error: any) {
          toast.error(error.message)
        }
      }}
    >
      Add to Cart
    </Button>
  )
}
