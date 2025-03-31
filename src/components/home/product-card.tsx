import React from 'react'
import Image from 'next/image'
import { formatNumber } from '@/lib/utils'

import Link from 'next/link'
import { z } from 'zod'
import { ProductSchema } from '@/lib/validators'
import ImageHover from '../product/image-hover'
import Rating from '../product/rating'
import ProductPrice from '../product/product-price'

export default function ProductCard({
  product,
  hideDetails = false,
}: {
  product: z.infer<typeof ProductSchema>
  hideDetails?: boolean
}) {
  return (
    <div className='flex flex-col'>
      <Link href={`/product/${product.slug}`}>
        <div className='relative h-52'>
          {product.images.length > 1 ? (
            <ImageHover
              src={product.images[0]}
              hoverSrc={product.images[1]}
              alt={product.name}
            />
          ) : (
            <div className='relative h-52'>
              <Image
                src={product.images[0]}
                fill
                alt={product.name}
                sizes='80vw'
                className='object-contain'
              />
            </div>
          )}
        </div>
      </Link>
      {!hideDetails && (
        <>
          <div className='p-3 flex-2 text-center'>
            <div className='flex-1 space-y-2'>
              <p className='font-bold'>{product.brand}</p>
              <Link
                href={`product/${product.slug}`}
                className='overflow-hidden text-ellipsis'
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {product.name}
              </Link>
              <div className='flex gap-2 justify-center'>
                <Rating rating={product.avgRating} />
                <span>{formatNumber(product.numReviews)}</span>
              </div>

              <ProductPrice
                isDeal={product.tags.includes('todays-deal')}
                price={product.price}
                listPrice={product.listPrice}
                forListing
              />
            </div>
          </div>
        </>
      )}
      {hideDetails && (
        <h3 className='text-sm my-2 text-center font-semibold'>
          {product.name}
        </h3>
      )}
    </div>
  )
}
