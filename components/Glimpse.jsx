import Link from 'next/link'
import React from 'react'

const Glimpse = () => {
    return (
        <div>
            <div className="w-full min-h-[90vh]  pt-10 md:pt-0"
            >
                <div className="h-full w-full justify-center items-center pb-20 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent "
                    style={{
                        // background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.433),rgba(2, 2, 2, 0.133))'
                    }}
                >
                    {/* <h2 className='text-center tracking-wider text-4xl lg:text-6xl pt-8'>Events</h2> */}
                    <div className='mb-10'>
                        <img src="/glimpsetext.png" alt="" className='w-80 md:w-full' />
                    </div>
                    <div className='w-full flex flex-wrap justify-center items-center gap-10 my-10'>
                        <div className='w-80 h-96 relative bg-white/10 rounded-xl p-4 px-6'>
                            <div className='border w-full h-full py-2 '>
                                <div className='border absolute w-[286px] h-[335px] right-4 '>
                                    <img src="/gimg1.webp" alt="" className='w-full h-full object-cover px-2' />
                                </div>
                            </div>
                        </div>
                        <div className='w-80 h-96 relative bg-white/10 rounded-xl p-4 px-6'>
                            <div className='border w-full h-full py-2 '>
                                <div className='border absolute w-[286px] h-[335px] right-4 '>
                                    <img src="/gimg2.webp" alt="" className='w-full h-full object-cover px-2' />
                                </div>
                            </div>
                        </div>
                        <div className='w-80 h-96 relative bg-white/10 rounded-xl p-4 px-6'>
                            <div className='border w-full h-full py-2 '>
                                <div className='border absolute w-[286px] h-[335px] right-4 '>
                                    <img src="/gimg3.webp" alt="" className='w-full h-full object-cover px-2' />
                                </div>
                            </div>
                        </div>
                        <div className='w-80 h-96 relative bg-white/10 rounded-xl p-4 px-6'>
                            <div className='border w-full h-full py-2 '>
                                <div className='border absolute w-[286px] h-[335px] right-4 '>
                                    <img src="/gimg4.webp" alt="" className='w-full h-full object-cover px-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link href='/gallery' className='z-50 cursor-pointer p-2'>
                            <div className='border text-white p-2 px-5 rounded-full cursor-pointer hover:bg-white/15'>Explore</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Glimpse
