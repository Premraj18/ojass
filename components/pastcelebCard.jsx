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
    imgUrl: "/pastspeaker/1.webp"
  },
  {
    id: "2",
    imgUrl: "/pastspeaker/2.webp"
  },
  {
    id: "3",
    imgUrl: "/pastspeaker/3.webp"
  },
  {
    id: "4",
    imgUrl: "/pastspeaker/4.webp"
  },
  {
    id: "5",
    imgUrl: "/pastspeaker/5.webp"
  },
  {
    id: "6",
    imgUrl: "/pastspeaker/6.webp"
  },
  {
    id: "7",
    imgUrl: "/pastspeaker/7.webp"
  },
  {
    id: "8",
    imgUrl: "/pastspeaker/8.webp"
  },
  {
    id: "9",
    imgUrl: "/pastspeaker/9.webp"
  },
  {
    id: "11",
    imgUrl: "/pastspeaker/11.webp"
  },
  {
    id: "13",
    imgUrl: "/pastspeaker/13.webp"
  },
  {
    id: "14",
    imgUrl: "/pastspeaker/14.webp"
  },
  {
    id: "15",
    imgUrl: "/pastspeaker/15.webp"
  },
  {
    id: "16",
    imgUrl: "/pastspeaker/16.webp"
  },
  {
    id: "17",
    imgUrl: "/pastspeaker/17.webp"
  },
  {
    id: "18",
    imgUrl: "/pastspeaker/18.webp"
  },
  {
    id: "19",
    imgUrl: "/pastspeaker/19.webp"
  },
  {
    id: "20",
    imgUrl: "/pastspeaker/20.webp"
  },
  {
    id: "21",
    imgUrl: "/pastspeaker/21.webp"
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

              <div className=" w-[100%] md:h-[35vh] h-72 cursor-pointer text-white scale-95 bg-white/5 rounded-lg border-gray-200 border-[2px] shadow-md transition-all duration-300 hover:scale-100">
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
