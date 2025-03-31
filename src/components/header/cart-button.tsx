'use client'
import { ShoppingCart } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import useIsMounted from '@/hooks/use-is-mounted'
import useCartStore from '@/hooks/use-cart-store'

import CartItem from '../cart/CartItem'
import CartSheet from '../cart/CartSheet'
import { useRouter } from 'next/navigation'

export default function CartButton() {
  const {
    cart: { items, totalPrice },
  } = useCartStore()

  const mounted = useIsMounted()
  const router = useRouter()

  if (mounted) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none text-primary hover:text-primary px-2 relative'>
          {items?.length > 0 && (
            <div className='absolute flex w-5 h-5 text-xs items-center justify-center -top-2 -right-1 font-semibold bg-primary rounded-full text-background'>
              {items?.length}
            </div>
          )}
          <ShoppingCart className='' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn('mr-5 p-5', { 'w-[320px]': items?.length > 0 })}
        >
          {items?.length > 0 && (
            <DropdownMenuGroup>
              {items.map((product) => (
                <DropdownMenuItem asChild key={product.slug}>
                  <CartItem product={product} />
                </DropdownMenuItem>
              ))}
              <Separator className='my-3' />
              <div className='space-y-3'>
                <div className='flex justify-between '>
                  <h3 className='font-semibold'>Subtotal</h3>
                  <p className='font-bold'>${totalPrice.toFixed(2)}</p>
                </div>

                <div className='flex justify-between '>
                  <h3 className='font-semibold text-sm'>Total</h3>
                  <p className='font-bold text-sm text-orange-400'>
                    ${(totalPrice * 1.08).toFixed(2)}
                  </p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Shipping and texes calculated at checkout
                </p>
                <div className='flex justify-between'>
                  <CartSheet>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'cursor-pointer',
                      )}
                    >
                      View Cart
                    </div>
                  </CartSheet>
                  <Button
                    onClick={() => {
                      router.push('/checkout')
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </DropdownMenuGroup>
          )}

          {items?.length == 0 && (
            <DropdownMenuGroup className='flex flex-col gap-2 items-center'>
              <img src='/empty-cart.png' className='w-28' />
              <h3>Your cart is empty !</h3>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  } else {
    return <></>
  }
}
