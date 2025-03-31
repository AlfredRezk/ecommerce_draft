import { carousels } from '@/lib/data'
import React from 'react'
import { HomeCarousel } from './home-carousel'
import { HomeCard } from './home-card'
import {
  getAllCategories,
  getProductsByTag,
  // getProductsByTag,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import { toSlug } from '@/lib/utils'

import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/home/product-slider'
import BrowsingHistoryList from '@/components/product/browsing-history-list'

export default async function HomePage() {
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({ tag: 'new-arrival', limit: 4 })
  const featureds = await getProductsForCard({ tag: 'featured', limit: 4 })
  const bestSellers = await getProductsForCard({ tag: 'best-seller', limit: 4 })
  const todayDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/products/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?tag=new-arrival',
      },
    },
  ]
  return (
    <>
      <HomeCarousel items={carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Today's Deals"} products={todayDeals} />
          </CardContent>
        </Card>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title={'Best Selling Products'}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>

      <BrowsingHistoryList />
    </>
  )
}
