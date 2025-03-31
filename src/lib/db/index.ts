import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cashed = (global as any).mongoose || { conn: null, paromise: null }

export const connectDB = async (MONGODB_URI = process.env.MONGODB_URI) => {
  if (cashed.conn) return cashed.conn
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')
  cashed.paromise = cashed.paromise || mongoose.connect(MONGODB_URI)
  cashed.conn = await cashed.paromise
  return cashed.conn
}
