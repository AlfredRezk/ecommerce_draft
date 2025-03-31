export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'ClaruswayShop'

export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN ||
  'Get the best products at the best prices'

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'ClaruswayShop is a online store for you to buy the best products at the best prices'

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_PRICE = Number(process.env.FREE_SHIPPING_PRICE || 50)

export const AVALIABLE_DELIVERY_DATES = [
  {
    name: 'Tomorrow',
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 3 Days',
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 5 Days',
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
]
