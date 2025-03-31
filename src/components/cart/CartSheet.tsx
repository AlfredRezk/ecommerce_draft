'use client'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ShoppingCart } from 'lucide-react'
import CartItem from './CartItem'
import useCartStore from '@/hooks/use-cart-store'
import { FREE_SHIPPING_PRICE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart } = useCartStore()
  const router = useRouter()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className='md:max-w-full w-[320px]   md:w-[500px] flex h-full flex-col'
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle className='flex gap-2 text-xl justify-center text-primary'>
            Your Cart <ShoppingCart />
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <div className='px-5'>
          <div className='flex-1'>
            {cart?.items?.map((product) => (
              <CartItem product={product} key={product.slug} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className='bg-muted flex flex-col w-full gap-3 p-5 rounded-xl'>
            <div className='flex justify-between'>
              <h3>Subtotal({cart?.items?.length} items)</h3>
              <h3> ${cart?.totalPrice.toFixed(2)}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Taxes</h3>
              <h3> {(cart?.totalPrice * 0.08).toFixed(2)}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Delivery Cost</h3>
              {cart?.totalPrice >= FREE_SHIPPING_PRICE && (
                <h3 className='font-semibold text-green-500'>FREE</h3>
              )}
              {cart?.totalPrice < FREE_SHIPPING_PRICE && (
                <h3 className='font-semibold text-slate-500'>$4.50</h3>
              )}
            </div>

            <Separator />
            <div className='flex justify-between pb-10'>
              <h3 className='font-bold'>TOTAL (INC VAT.)</h3>
              <h3 className='font-bold'>
                $
                {cart?.totalPrice >= FREE_SHIPPING_PRICE
                  ? (cart?.totalPrice * 1.08).toFixed(2)
                  : (cart?.totalPrice * 1.08 + 4.5).toFixed(2)}
              </h3>
            </div>

            <SheetClose>
              <div
                className={cn(buttonVariants(), 'w-full cursor-pointer')}
                onClick={() => router.push('/checkout')}
              >
                Checkout
              </div>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
