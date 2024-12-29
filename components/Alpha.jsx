"use client"
import React from 'react'
import EventCard from "./EventCard"
import Link from 'next/link'
import Image from 'next/image'

const Alpha = () => {
  return (
    <div className="w-full sm:mt-0 lg:pt-14 bg-center bg-cover bg-no-repeat"
    >
      <div className="h-full w-full justify-center items-center flex flex-col ">
        {/* <h2 className='text-center tracking-wider text-4xl lg:text-6xl pt-8'>Events</h2> */}
        <div className='mb-10 flex justify-center'>
          <Image width={400} height={100} src="/alpha.webp" alt="event" className='w-72 md:w-[80%]'/>
        </div>
        <div className='w-full'>
          <p className='lg:px-40 px-3 mb-4 lg:text-center md:text-lg text-base'>OJASS Alpha is a unique competition for students from classes 6 to 12, promoting creativity, innovation, and teamwork through exciting challenges. Participants also get free access to OJASS’25, Eastern India’s second-largest Techno-Management Fest, featuring workshops, exhibitions, expert lectures, and cultural evenings!</p>
          <p className='lg:px-40 px-3 text-center md:text-2xl text-xl font-semibold'>Register Now : </p>
        </div>
        <div>
          <Link href='/alpha' className='z-50 cursor-pointer p-2'>
            <div className='border text-white p-2 px-5 rounded-full cursor-pointer hover:bg-white/15'>Click Here</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Alpha
