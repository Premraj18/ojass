"use client"
import React from 'react'
import EventCard from "./EventCard"
import Link from 'next/link'

const Event = () => {
  return (
    <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-center bg-cover bg-no-repeat"
    >
      <div className="h-full w-full justify-center items-center pb-20 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent "
        style={{
          // background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.433),rgba(2, 2, 2, 0.133))'
        }}
      >
        {/* <h2 className='text-center tracking-wider text-4xl lg:text-6xl pt-8'>Events</h2> */}
        <div className='mb-10'>
          <img src="/eventtext.png" alt="" className='w-52 md:w-full'/>
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
