import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination, Autoplay } from 'swiper/modules';

const Data = [
    {
        id: "1",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSuhaniShah.35847e3a.webp&w=384&q=75"
    },
    {
        id: "2",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzakeerKhan.3127a77e.webp&w=384&q=75"
    },
    {
        id: "3",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSuhaniShah.35847e3a.webp&w=384&q=75"
    },
    {
        id: "4",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzakeerKhan.3127a77e.webp&w=384&q=75"
    },
    {
        id: "5",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSuhaniShah.35847e3a.webp&w=384&q=75"
    },
    {
        id: "6",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzakeerKhan.3127a77e.webp&w=384&q=75"
    },
    {
        id: "7",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSuhaniShah.35847e3a.webp&w=384&q=75"
    },
    {
        id: "8",
        imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzakeerKhan.3127a77e.webp&w=384&q=75"
    }

]

const Celeb = () => {
    return (
        <div className='mb-20 flex flex-col justify-center items-center'>
            <div className='flex justify-center mb-10'>
                <img src="/celebtext.png" alt="" className='w-80 md:w-[35vw] ' />
            </div>
            <div className='min-h-[50vh]'>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {
                        Data.map((d) => {
                            return (
                                <SwiperSlide key={d.id} color='green' className=''>
                                    <img src={d.imgUrl} className='w-full h-full object-cover border-2 rounded-3xl' />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Celeb
