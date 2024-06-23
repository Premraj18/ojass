"use client"
import React from 'react'
import { delay, motion } from 'framer-motion'

const variants = {
    initial: {
        x:-40,
        opacity: 0,
    },
    animate: {
        x:0,
        opacity: 1,
        transition: {
            duration: 1.5,
            staggerChildren: 0.1,
        },
    },
}

const aboutvarients = {
    initial: {
        y: 30,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 1,
            staggerChildren: 0.2,
        },
    },
}

const About = () => {
    return (
        <div className="w-full md:h-[100vh] sm:mt-0 -z-10 bg-[url('/bghero.jpg')] bg-center bg-fixed bg-cover bg-no-repeat"

        >
            <div className="h-full w-full justify-center items-center gap-y-20 pb-20 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent "
                style={{
                    background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.633),rgba(2, 2, 2, 0.633))'
                }}
            >
                <motion.h2 className='text-center tracking-wider text-6xl z-20 text-white'
                    variants={variants}
                    initial='initial'
                    whileInView='animate'
                >About Us</motion.h2>
                <motion.div className='w-2/3 z-20 text-gray-300'
                    variants={aboutvarients}
                    initial='initial'
                    whileInView='animate'
                >
                    <motion.div className='text-center' variants={aboutvarients}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Adipisci doloribus id ipsam amet culpa minima error architecto,
                        aliquid quaerat, laborum, sunt cumque autem nobis natus ad
                        perspiciatis quo nostrum cum fugiat magnam quis. Excepturi at maiores,
                        dignissimos deleniti maxime sapiente!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam
                        asperiores animi, itaque similique praesentium delectus voluptatibus ipsum! In, itaque.
                    </motion.div>
                    <motion.div className='text-center pt-20' variants={aboutvarients}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Adipisci doloribus id ipsam amet culpa minima error architecto,
                        aliquid quaerat, laborum, sunt cumque autem nobis natus ad
                        perspiciatis quo nostrum cum fugiat magnam quis. Excepturi at maiores,
                        dignissimos deleniti maxime sapiente!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam
                        asperiores animi, itaque similique praesentium delectus voluptatibus ipsum! In, itaque.
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default About
