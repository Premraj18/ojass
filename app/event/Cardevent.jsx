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
                // plugins={[Autoplay({ delay: 1500 })]}
                opts={{
                    align: "start",
                }}
                className="w-[100%]"
            >
                <CarouselContent>
                    {data?.map((data, index) => (

                        <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4 flex justify-center">
                            <div className='lg:w-[22vw] w-[80vw] h-[420px] relative flex flex-col items-center justify-center bg-white/10 rounded-xl px-6 gap-y-2 border'>
                                <div className=' w-[90%] h-[85%] mt-8'>
                                    <div className='border'>
                                        <img src={data.img} alt="" className=' h-[320px] w-full object-cover' />
                                    </div>
                                </div>
                                <Link href={data.redirect} className='cursor-pointer p-2 mb-5'>
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
