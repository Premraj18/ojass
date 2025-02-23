"use client"
import React from 'react'
import { BsLinkedin, BsMailbox } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import Data from './Team.json'
import { motion } from 'framer-motion'
import Image from 'next/image'

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      // staggerChildren: 0.1,
    },
  },
}

// {
//   "name": "Sourav Kumar",
//   "img": "team/17.webp",
//   "post": "Logistics Head",
//   "linkedin": "https://www.linkedin.com/in/sourav-kumar-4a090a1b1/",
//   "email": "mailto:2021ugcs038@nitjsr.ac.in"
// },

const Page = () => {
  return (
    <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img1.webp')] bg-center bg-cover bg-no-repeat bg-fixed">
      {/* <h2 className='text-5xl text-center mt-20 underline'>Team Ojass</h2> */}
      <div className='pt-20 w-full flex justify-center items-center'>
        <Image width={400} height={100} src="/teamtext.webp" alt="team" className='w-[80%] lg:w-1/3' />
      </div>
      <motion.div className='flex flex-wrap items-center justify-center md:gap-x-24 md:gap-y-16 gap-8 py-20 lg:px-16 px-5'
        variants={variants}
        initial='initial'
        animate='animate'
      >
        {
          Data?.map((e, i) => (
            <div key={e.id} className="group sm:w-auto relative cursor-pointer flex items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
              <div className="block border md:w-72 md:h-72 w-60 h-60 rounded-lg bg-black  ">
                <Image width={400} height={100} alt="img" className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={e.img} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent  group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[50%] flex-col justify-center px-9  transition-all duration-500 group-hover:translate-y-[20%]">
                <h1 className=" text-2xl font-medium text-white mb-3">{e.name}</h1>
                <p className="mb-3 text-lg text-slate-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {e.post}
                </p>
                <p className="mb-3 flex gap-8 items-center text-xl text-slate-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a href={e.linkedin} target='_blank'><BsLinkedin/></a>
                  <a href={e.email} target='_blank'><FiMail/></a>
                </p>
              </div>
            </div>
          ))
        }

      </motion.div>
    </div>
  )
}

export default Page
