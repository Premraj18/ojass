"use client"
import React, { useRef } from 'react'
import { SparklesCore } from "../components/ui/sparkles";
import { delay, motion, useScroll, useTransform } from 'framer-motion'
import About from './About';

const variants = {
    initial: {
        x: -20,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.5,
            staggerChildren: 0.1,
        },
    },
}

const cosmosvarients = {
    initial: {
        y: 20,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.8,
        },
    },
}


const Hero = () => {
    const ref = useRef()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "180%"]);
    const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    return (
        <div ref={ref} className="min-h-[100vh] relative -z-10 -mt-24 w-full 
        flex flex-col items-center justify-center overflow-hidden bg-[url('/bghero.jpg')] bg-fixed bg-center bg-cover">
            <div className='min-h-[100vh] relative -z-10  w-full flex flex-col items-center justify-center'
                style={{
                    background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.233),rgba(2, 2, 2, 0.933))'
                }}
            >
                <div className="w-full absolute inset-0 h-full ">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1}
                        particleDensity={50}
                        speed={0.5}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />

                </div>
                <div className='min-h-[110vh] flex flex-col items-center justify-center'>
                    <motion.div
                        className="side flex space-x-5 uppercase font-sans 
                    text-5xl sm:text-[7vw] md:text-8xl font-extrabold 
                    [-webkit-text-stroke:1px_#f5f5f5] text-transparent m-1 mt-20
                    md:mt-20 tracking-wide whitespace-pre pb-10 z-20 "
                        variants={variants}
                        initial='initial'
                        whileInView='animate'
                    >
                        <motion.p variants={variants} className="text-white">
                            O
                        </motion.p>
                        <motion.p variants={variants} className="text-white">
                            J
                        </motion.p>
                        <motion.p variants={variants} className="">
                            A
                        </motion.p>
                        <motion.p variants={variants} className="">
                            S
                        </motion.p>
                        <motion.p variants={variants} className="text-white">
                            S
                        </motion.p>
                    </motion.div>
                    <motion.div className="md:w-2/3 text-center font-light flex justify-center z-20 items-center px-5"
                        variants={cosmosvarients}
                        initial='initial'
                        whileInView='animate'
                    >
                        <motion.p className='md:text-3xl text-xl tracking-wider ' variants={cosmosvarients}>The Annual Techno Management Fest of National Institute of Technology, Jamshedpur</motion.p>
                    </motion.div>
                </div>
                <div className=''>
                    <About />
                </div>
            </div>
        </div>
    )
}

export default Hero
