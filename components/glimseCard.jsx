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
import Image from "next/image";

const Data = [
    { id: "1", imgUrl: "/gimg1.webp" },
    { id: "2", imgUrl: "/gimg2.webp" },
    { id: "3", imgUrl: "/gimg3.webp" },
    { id: "4", imgUrl: "/gimg4.webp" },
];

const GlimseCard = () => {

    return (
        <main className="flex mb-10 flex-col items-center lg:mt-12 mt-5 overflow-x-hidden">
            <Carousel
                plugins={[Autoplay({ delay: 4000 })]}
                opts={{
                    //   align: "start",
                }}
                className="w-[80%] lg:w-[85%] lg:pl-10"
            >
                <CarouselContent>
                    {Data.map((e, index) => (

                        <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3">

                            <div key={e.id} className="w-72 h-80 relative bg-white/10 rounded-xl p-4 px-6">
                                <div className="border w-full h-full py-2">
                                    <div className='border absolute w-[256px] h-[271px] right-4 '>
                                        <Image
                                            src={e.imgUrl}
                                            alt={`Image ${e.id}`}
                                            width={400}
                                            height={100}
                                            className="w-full h-full object-cover px-2"
                                        />
                                    </div>
                                </div>
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

export default GlimseCard;
