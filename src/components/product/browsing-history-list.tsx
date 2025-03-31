'use client'

import useBrowsingHistory from '@/hooks/use-browsing-history'

import React, { useEffect } from 'react'
import ProductSlider from '../home/product-slider'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

function ProductList({
  title,
  type = 'history',
  hideDetails = false,
  excludeId = '',
}: {
  title: string
  type: 'history' | 'related'
  excludeId?: string
  hideDetails?: boolean
}) {
  const { products } = useBrowsingHistory()
  const [data, setData] = React.useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&excludeId=${excludeId}&categories=${products
          .map((product) => product.category)
          .join(',')}&ids=${products.map((product) => product.id).join(',')}`,
      )
      const data = await res.json()
      setData(data)
    }
    fetchProducts()
  }, [excludeId, products, type])

  return (
    data.length > 0 && (
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  )
}

export default function BrowsingHistoryList({
  className,
}: {
  className?: string
}) {
  const { products } = useBrowsingHistory()

  return (
    products.length > 0 && (
      <div className={cn('md:p-4 md:space-y-4 bg-border', className)}>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductList
              title={"Related to items that you've viewed"}
              type='related'
            />
          </CardContent>
        </Card>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductList
              title={'Your browsing history'}
              type='history'
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
    )
  )
}
