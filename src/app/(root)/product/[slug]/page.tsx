import { Card, CardContent } from '@/components/ui/card'
import {
  getProductBySlug,
  getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'
import SelectVariant from '@/components/product/select-variant'

import Rating from '@/components/product/rating'
// import BrowsingHistoryList from '@/components/product/browsing-history-list'
// import AddToBrowsingHistory from '@/components/product/add-to-browsing-history'

import ProductImgesList from '@/components/product/ProductImgesList'
import ProductQuantity from '@/components/product/product-quantity'
import AddToBrowsingHistory from '@/components/product/add-to-browsing-history'
import ProductSlider from '@/components/home/product-slider'
import BrowsingHistoryList from '@/components/product/browsing-history-list'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const product = await getProductBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const searchParams = await props.searchParams
  const { page, color, size } = searchParams
  const params = await props.params
  const { slug } = params
  const product = await getProductBySlug(slug)

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || '1'),
  })

  return (
    <div>
      <AddToBrowsingHistory id={product._id} category={product.category} />
      <section className='container my-2 lg:my-0 h-full mx-auto flex flex-col  w-full justify-center items-center py-5'>
        <Card className='flex shadow-2xl flex-col  lg:flex-row gap-10 w-full justify-center items-center p-10 rounded-xl mb-10 relative'>
          <div className='flex-1 overflow-hidden '>
            <ProductImgesList images={product.images} />
          </div>

          <div className='flex-1 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
            <h1 className='font-bold text-lg lg:text-xl'>{product.name}</h1>
            <p className='p-medium-16 rounded-full bg-grey-500/10   text-grey-500'>
              Brand {product.brand} {product.category}
            </p>
            <p className='text-lg leading-8'>{product.description}</p>
            <div className='flex items-center gap-2'>
              <span>{product.avgRating.toFixed(1)}</span>
              <Rating rating={product.avgRating} />
              <span> {product.numReviews}ratings</span>
            </div>

            <div>
              <SelectVariant
                product={product}
                size={size || product.sizes[0]}
                color={color || product.colors[0]}
              />
            </div>

            {product.countInStock > 0 && product.countInStock <= 3 && (
              <div className='text-destructive font-bold'>
                {`Only ${product.countInStock} left in stock! - order soon`}
              </div>
            )}
            {product.countInStock !== 0 ? (
              <div className='text-green-700 text-xl'>In Stock </div>
            ) : (
              <div className='text-destructive text-xl'> Out of Stock </div>
            )}

            <ProductQuantity product={product} size={size} color={color} />
          </div>
        </Card>
      </section>
      <div className='container mx-auto'>
        <div className='md:p-4 md:space-y-4'>
          <Card className='w-full rounded-none'>
            <CardContent className='p-4 items-center gap-3'>
              <ProductSlider
                products={relatedProducts.data}
                title={`Best Sellers in ${product.category}`}
              />
            </CardContent>
          </Card>
        </div>

        <section>
          <BrowsingHistoryList className='bg-background' />
        </section>
      </div>
    </div>
  )
}
