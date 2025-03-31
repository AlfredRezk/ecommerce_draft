'use client'
import Link from 'next/link'
import React from 'react'
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { ChevronUp } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from './ui/button'

export default function Footer() {
  return (
    <>
      <div className='w-full'>
        <Button
          variant='ghost'
          className=' w-full  rounded-none '
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className='mr-2 h-4 w-4' />
          Back to top
        </Button>
      </div>

      <footer className=' mx-auto bg-muted py-12 text-sm w-full border-t-[10px] border-t-primary '>
        <div className='container mx-auto '>
          {/* Top */}
          <div className=' flex flex-col lg:flex-row justify-between gap-24 pb-10'>
            {/* left */}
            <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
              <Link href='/' className='text-2xl tracking-wide'>
                {' '}
                Clarusway Shop
              </Link>
              <p>3200 Main st. New York 11011, United States</p>
              <span className='font-semibold'>shop@clarusway.dev</span>
              <span className='font-semibold'>+1 234 567 8900</span>
              <div className='flex gap-6'>
                <FaFacebookSquare size={24} />
                <FaInstagram size={24} />
                <FaYoutube size={24} />
                <FaPinterest size={24} />
                <FaTwitter size={24} />
              </div>
            </div>
            {/* center */}
            <div className='hidden lg:flex justify-between w-1/2 '>
              <div className='flex flex-col justify-between w-1/3'>
                <h1 className='font-medium text-lg'>Company</h1>
                <div className='flex flex-col gap-6'>
                  <Link href=''>About Us</Link>
                  <Link href=''>Carrers</Link>
                  <Link href=''>Affiliates</Link>
                  <Link href=''>Blog</Link>
                  <Link href=''>Contact Us</Link>
                </div>
              </div>
              <div className='flex flex-col justify-between  w-1/3'>
                <h1 className='font-medium text-lg'>SHOP</h1>
                <div className='flex flex-col gap-6'>
                  <Link href=''>New Arrivals</Link>
                  <Link href=''>Accessories</Link>
                  <Link href=''>Men </Link>
                  <Link href=''>Women</Link>
                  <Link href=''>All Products</Link>
                </div>
              </div>
              <div className='flex flex-col justify-between'>
                <h1 className='font-medium text-lg'>Company</h1>
                <div className='flex flex-col gap-6'>
                  <Link href=''>About Us</Link>
                  <Link href=''>Carrers</Link>
                  <Link href=''>Affiliates</Link>
                  <Link href=''>Blog</Link>
                  <Link href=''>Contact Us</Link>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            {/* right */}
            <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
              <h1 className='font-medium text-lg'> SUBSCRIBE</h1>
              <p>
                Be the first to get the latest news about trends, promotions and
                much more!
              </p>
              <div className='flex w-full'>
                <input
                  type='text'
                  placeholder='Email address'
                  className='p-4 w-3/4'
                />
                <button className='w-1/4 bg-foreground text-background cursor-pointer'>
                  Join
                </button>
              </div>
              <span className='font-semibold'>Secure Payments</span>
              <img src='/images/payment.png' alt='' className='w-full' />
            </div>
          </div>
          <Separator className='bg-muted-foreground' />
          {/* Bottom */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-5 '>
            <div className='flex gap-2 items-center '>
              <img src='/images/logo.png' className='w-10' />
              <h1 className='text-2xl font-bold'>Clarusway</h1>
            </div>
            <p className='text-md font-semibold'>Copy Rights Reserved @2024</p>
          </div>
        </div>
      </footer>
    </>
  )
}
