"use client"
import React from 'react'
import EventCard from "./EventCard"

const Event = () => {
  return (
    <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img5.jpg')] bg-center bg-cover bg-no-repeat"
    >
      <div className="h-full w-full justify-center items-center pb-20 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent "
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.433),rgba(2, 2, 2, 0.133))'
        }}
      >
        <h2 className='text-center tracking-wider text-4xl lg:text-6xl pt-8'>Events</h2>
        <div className='w-full'>
          <EventCard/>
        </div>
      </div>
    </div>
  )
}

export default Event
