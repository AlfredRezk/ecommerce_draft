'use client'

import { cn, formatCurrency } from '@/lib/utils'

export default function ProductPrice({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number
  className?: string
  listPrice?: number
  isDeal?: boolean
  forListing?: boolean
  plain?: boolean
}) {
  const discountPrice = Math.round(100 - (price / listPrice) * 100)
  const stringValue = price.toString()
  const [intValue, floatValue] = stringValue.includes('.')
    ? stringValue.split('.')
    : stringValue

  return plain ? (
    formatCurrency(price)
  ) : listPrice == 0 ? (
    <div className={cn('text-3xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intValue}
      <span className='text-xs align-super'></span>
    </div>
  ) : isDeal ? (
    <div className='space-y-2'>
      <div className='flex justify-center items-center gap-2'>
        <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
          {discountPrice} % off
        </span>
        <div className='text-red-700 text-xs font-bold'>Limited time deal</div>
      </div>
      <div
        className={`flex ${forListing && 'justify-center'} items-center gap-2`}
      >
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'> $</span> {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
        <div className='text-muted-foreground text-xs py-2'>
          Was:
          <span className='line-through'> {formatCurrency(listPrice)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex justify-center gap-3'>
        <div className='text-3xl text-orange-700'> - {discountPrice}</div>
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'>$</span> {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
      </div>
      <div className='text-muted-foreground text-xs-py-2'>
        List price:{' '}
        <span className='line-through'> {formatCurrency(listPrice)}</span>
      </div>
    </div>
  )
}
