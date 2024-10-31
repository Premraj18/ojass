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
  },
  {
    id: "9",
    imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FSuhaniShah.35847e3a.webp&w=384&q=75"
  },
  {
    id: "10",
    imgUrl: "https://ojass-2024.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzakeerKhan.3127a77e.webp&w=384&q=75"
  }
]

const PastCelebCard = () => {

  return (
    <main className="flex mb-10 flex-col items-center lg:mt-12 mt-5 overflow-x-hidden">
      <Carousel
        plugins={[Autoplay({ delay: 4000 })]}
        opts={{
        //   align: "start",
        }}
        className="w-[80%]"
      >
        <CarouselContent>
          {Data.map((data, index) => (

            <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/5">

              <div className=" w-[100%] h-[37vh] cursor-pointer text-white scale-95 bg-white/5 rounded-lg border-gray-200 border-[2px] shadow-md transition-all duration-300 hover:scale-100">
                <img src={data.imgUrl} alt="" className="object-cover h-full w-full rounded-lg"/>
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

export default PastCelebCard;
