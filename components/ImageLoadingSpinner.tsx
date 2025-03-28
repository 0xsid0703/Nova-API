'use client'

import React, { useEffect, useState } from 'react'

const loadingImages = [
  '/slide/mark1.png',
  '/slide/mark2.png',
  '/slide/mark3.png',
  '/slide/mark4.png',
  '/slide/mark5.png',
  '/slide/mark6.png',
  '/slide/mark7.png',
  '/slide/mark8.png',
  '/slide/mark9.png',
  '/slide/mark10.png',
  '/slide/mark11.png',
  '/slide/mark12.png',
  '/slide/mark13.png',
  '/slide/mark14.png',
  '/slide/mark15.png',
  '/slide/mark16.png',
  '/slide/mark17.png',
  '/slide/mark18.png',
  '/slide/mark19.png',
  '/slide/mark20.png',
]

const ImageLoadingSpinner = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingImages.length)
    }, 60) // change image every 1 second

    return () => clearInterval(interval) // cleanup on unmount
  }, [])

  return (
    <div className="flex h-full justify-center items-center w-full">
      <img
        src={loadingImages[index]}
        alt="Loading..."
        className="w-32 h-24 object-contain transition-all duration-300"
      />
    </div>
  )
}

export default ImageLoadingSpinner
