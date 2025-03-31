'use server'

import { z } from 'zod'

import { connectDB } from '../db'
import Product, { IProduct } from '../models/Product'
import { ProductSchema } from '../validators'
import { PAGE_SIZE } from '../constants'

// GET ALL CATEGORIES
export async function getAllCategories() {
  await connectDB()
  const categories = await Product.find({ isPublished: true }).distinct(
    'category',
  )
  return categories
}

// GET PRODUCTS FOR CARD
export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  await connectDB()
  const products = await Product.find(
    { tags: { $in: [tag] }, isPublished: true },
    {
      name: 1,
      href: { $concat: ['/product/', '$slug'] },
      image: { $arrayElemAt: ['$images', 0] },
    },
  )
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// GET PRODUCT BY TAG
export async function getProductsByTag({
  tag,
  limit = 10,
}: {
  tag: string
  limit?: number
}) {
  await connectDB()
  const products = await Product.find({
    tags: { $in: [tag] },
    isPublished: true,
  })
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as IProduct[]
}

// GET PRODUCT BY SLUG
export async function getProductBySlug(slug: string) {
  await connectDB()
  const product = await Product.findOne({ slug, isPublished: true })
  if (!product) throw new Error('Product not found')
  return JSON.parse(JSON.stringify(product)) as IProduct
}

// GET RELATED PRODUCTS BY CATEGORY
export async function getRelatedProductsByCategory({
  category,
  productId,
  limit = PAGE_SIZE,
  page = 1,
}: {
  category: string
  productId: string
  limit?: number
  page: number
}) {
  await connectDB()
  const skipAmount = (Number(page) - 1) * limit
  const conditions = { isPublished: true, category, _id: { $ne: productId } }
  const products = await Product.find(conditions)
    .sort({ numSales: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const productCount = await Product.countDocuments(conditions)
  return {
    data: JSON.parse(JSON.stringify(products)) as z.infer<
      typeof ProductSchema
    >[],
    totalPages: Math.ceil(productCount / limit),
  }
}
