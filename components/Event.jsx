"use client"
import React from 'react'
import EventCard from "./EventCard"
import Link from 'next/link'
import Image from 'next/image'

const Event = () => {
  return (
    <div className="w-full min-h-[80vh] sm:mt-0 lg:pt-14 pt-20 bg-center bg-cover bg-no-repeat"
    >
      <div className="h-full w-full justify-center items-center pb-20 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent ">
        {/* <h2 className='text-center tracking-wider text-4xl lg:text-6xl pt-8'>Events</h2> */}
        <div className='mb-10'>
          <Image width={400} height={100} src="/eventtext.webp" alt="event" className='w-52 md:w-full'/>
        </div>
        <div className='w-full'>
          <EventCard />
        </div>
        <div>
          <Link href='/event' className='z-50 cursor-pointer p-2'>
            <div className='border text-white p-2 px-5 rounded-full cursor-pointer hover:bg-white/15'>Explore</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Event
