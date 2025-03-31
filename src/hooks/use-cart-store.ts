import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'
import {
  CartSchema,
  OrderItemSchema,
  ShippingAddressSchema,
} from '@/lib/validators'
import { z } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialSate: z.infer<typeof CartSchema> = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
}

interface CartState {
  cart: z.infer<typeof CartSchema>
  addItem: (
    item: z.infer<typeof OrderItemSchema>,
    quantity: number,
  ) => Promise<string>
  updateItem: (
    item: z.infer<typeof OrderItemSchema>,
    quantity: number,
  ) => Promise<void>
  removeItem: (item: z.infer<typeof OrderItemSchema>) => void
  setShippingAddress: (
    shippingAddress: z.infer<typeof ShippingAddressSchema>,
  ) => Promise<void>
  setPaymentMethod: (paymentMethod: string) => void
  setDeliveryDateIndex: (index: number) => Promise<void>
  clearCart: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialSate,
      addItem: async (
        item: z.infer<typeof OrderItemSchema>,
        quantity: number,
      ) => {
        const { items } = get().cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color,
        )
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not engough items in the stock')
          } else {
            if (item.countInStock < item.quantity) {
              throw new Error('Not engough items in the stock')
            }
          }
        }

        const updateCartItems = existItem
          ? items.map((x) =>
              x.product === item.product &&
              x.size === item.size &&
              x.color === item.color
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x,
            )
          : [...items, { ...item, quantity }]
        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAndPrice({ items: updateCartItems })),
          },
        })
        //eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        return updateCartItems.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color,
        )?.clientId!
      },
      updateItem: async (
        item: z.infer<typeof OrderItemSchema>,
        quantity: number,
      ) => {
        const { items, shippingAddress } = get().cart
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size,
        )
        if (!exist) return
        const updatedCartItems = items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity: quantity }
            : x,
        )
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        })
      },
      removeItem: async (item: z.infer<typeof OrderItemSchema>) => {
        const { items, shippingAddress } = get().cart
        const updatedCartItems = items.filter(
          (x) =>
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size,
        )
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
              shippingAddress,
            })),
          },
        })
      },

      setShippingAddress: async (
        shippingAddress: z.infer<typeof ShippingAddressSchema>,
      ) => {
        const { items } = get().cart
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({ items, shippingAddress })),
          },
        })
      },
      setPaymentMethod: (paymentMethod: string) => {
        set({
          cart: {
            ...get().cart,
            paymentMethod,
          },
        })
      },
      setDeliveryDateIndex: async (index: number) => {
        const { items, shippingAddress } = get().cart
        set({
          cart: {
            ...get().cart,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
              deliveryDateIndex: index,
            })),
          },
        })
      },
      clearCart: () => {
        set({ cart: { ...get().cart, items: [] } })
      },

      init: () => set({ cart: initialSate }),
    }),
    {
      name: 'cart-store',
    },
  ),
)

export default useCartStore
