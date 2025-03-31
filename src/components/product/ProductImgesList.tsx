'use client'
import { cn } from '@/lib/utils'

import React, { useState } from 'react'

export default function ProductImgesList({ images }: { images: string[] }) {
  const [curretImage, setCurrentImage] = useState(images[0])

  return (
    <>
      <div className='flex flex-col gap-5 overflow-hidden  justify-center items-center '>
        <div className='overflow-hidden rounded-xl'>
          <img
            src={curretImage}
            alt=''
            className='object-contain object-bottom hover:scale-125 transition  h-[350px]'
          />
        </div>

        <div className='flex gap-5 justify-center py-2'>
          {images.map((img) => (
            <img
              key={img}
              src={img}
              className={cn(
                'w-24 h-24 object-cover cursor-pointer rounded-lg',
                {
                  'ring-2 ring-offset-2 ring-foreground': curretImage == img,
                },
              )}
              onClick={() => setCurrentImage(img)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
