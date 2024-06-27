"use client"
import React from 'react'
import { BsLinkedin, BsMailbox } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import Data from './Team.json'
import { motion } from 'framer-motion'

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

const Page = () => {
  return (
    <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img1.jpg')] bg-center bg-cover bg-no-repeat bg-fixed">
      {/* <h2 className='text-5xl text-center mt-20 underline'>Team Ojass</h2> */}
      <div className='pt-20 w-full flex justify-center items-center'>
        <img src="/teamtext.png" alt="" className='w-[80%] lg:w-1/3' />
      </div>
      <motion.div className='flex flex-wrap items-center justify-center gap-x-24 gap-y-16 py-20 px-5'
        variants={variants}
        initial='initial'
        animate='animate'
      >
        {
          Data?.map((e, i) => (
            <motion.div key={i} className='flex items-center justify-center hover:scale-[1.05] transition-all duration-[2]'
              variants={variants}
            >
              <motion.div className='w-[320px] h-[400px] bg-white/10 rounded-2xl flex flex-col justify-center items-center gap-5' style={{ boxShadow: '0 0 8px rgb(108, 106, 106)' }}
              >
                <motion.img src="/astro.png" alt="" className='border w-[70%] h-52 object-cover' />
                <motion.h2 className='text-xl font-medium'>{e.name}</motion.h2>
                <motion.h3 className='text-lg'>{e.post}</motion.h3>
                <motion.div className='flex gap-8 items-center'>
                  <a href="" target='_blank'><BsLinkedin /></a>
                  <a href="" target='_blank'><FiMail /></a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        }

      </motion.div>
    </div>
  )
}

export default Page
