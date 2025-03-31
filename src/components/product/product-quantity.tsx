'use client'
import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/models/Product'

import { generatedId, round2 } from '@/lib/utils'
import AddToCart from '../cart/add-to-cart-btn'
import ProductPrice from './product-price'

const ProductQuantity = ({
  product,
  size,
  color,
}: {
  product: IProduct
  size?: string
  color?: string
}) => {
  const { price } = product
  const [total, setTotal] = useState(Number(price))
  const [quantity, setQuantity] = useState(1)
  //   const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(quantity * price)
  }, [quantity, price])

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-start'>
        <ProductPrice price={total} className='text-primary' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='font-semibold text-xl'>Quantity</span>
        <div className='flex gap-4 items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            <Minus />
          </Button>
          <span className='font-semibold text-2xl'>{quantity}</span>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setQuantity((prev) => (prev < 10 ? prev + 1 : 9))}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <AddToCart
        item={{
          clientId: generatedId(),
          product: product._id,
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: round2(product.price),
          quantity: quantity,
          image: product.images[0],
          size: size || product.sizes[0],
          color: color || product.colors[0],
        }}
      />
    </div>
  )
}

export default ProductQuantity
