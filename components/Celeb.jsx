import React, { useRef, useState } from 'react';
import PastCelebCard from './pastcelebCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

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
        <div className='mb-5 md:mb-20 flex flex-col justify-center items-center'>
            <div className='flex justify-center mb-10'>
                <Image width={400} height={100} src="/celebtext.webp" alt="celeb" className='hidden md:block w-80 md:w-[50vw] ' />
                <Image width={400} height={100} src="/celebtext2.webp" alt="celeb" className='md:hidden w-80 md:w-[50vw] ' />
            </div>
            <div className='min-h-[50vh] w-full'>
                <PastCelebCard/>
            </div>
        </div>
    )
}

export default Celeb
