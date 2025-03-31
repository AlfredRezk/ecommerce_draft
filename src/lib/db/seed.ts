/* eslint-disable @typescript-eslint/no-explicit-any */

import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import { connectDB } from '.'
import User from '../models/User'
import { products, users } from '../data'
import Product from '../models/Product'

loadEnvConfig(cwd())

const main = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)

    await User.deleteMany()
    const createUsers = await User.insertMany(users)

    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)
    console.log({
      createUsers,
      createdProducts,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
