"use client";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const CardEvent = ({data}) => {

    return (
        <main className="flex flex-col items-center overflow-x-hidden">
            <Carousel
                plugins={[Autoplay({ delay: 1500 })]}
                opts={{
                    align: "start",
                }}
                className="w-[100%]"
            >
                <CarouselContent>
                    {data?.map((data, index) => (

                        <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4">
                            <div className='w-80 h-96 relative flex flex-col items-center justify-center bg-white/10 rounded-xl px-6 gap-y-6 border'>
                                <div className='w-[90%] h-[80%]'>
                                    <div className='absolute w-[242px] h-[280px] top-8 border '>
                                        <img src={data.img} alt="" className='w-full h-full object-cover' />
                                    </div>
                                </div>
                                <Link href={data.redirect} className='cursor-pointer p-2'>
                                    <div className='border text-white p-2 px-5 rounded cursor-pointer hover:bg-white/15'>Participate</div>
                                </Link>
                            </div>
                        </CarouselItem>

                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    );
};

export default CardEvent;
