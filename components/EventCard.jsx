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
    title: "Coding Chronicles",
    description: "A journey through the world of programming, showcasing innovative projects, problem-solving adventures, and creative web development endeavors, blending technology with impactful storytelling and growth.",
    imgUrl: "/sponser/skoda.webp"
  },
  {
    id: "2",
    title: "Game Craft",
    description: "A thrilling gaming event where participants showcase their skills in intense competitions featuring popular games like BGMI and Valorant, fostering camaraderie, excitement, and epic battles for glory and triumph.",
    imgUrl: "/sponser/img6.webp"
  },
  {
    id: "3",
    title: "Crypto Craft",
    description: "An engaging event delving into the world of cryptocurrencies and blockchain, fostering innovation, strategic thinking, and knowledge-sharing to master the art of digital finance and technology.",
    imgUrl: "/sponser/img7.webp"
  },
  {
    id: "4",
    title: "Lens Craft",
    description: "A creative competition celebrating the art of storytelling through videos and reels, where participants showcase their vision, editing skills, and originality to craft captivating visual narratives.",
    imgUrl: "/sponser/img8.webp"
  },
  {
    id: "5",
    title: "Department Event",
    description: "A vibrant gathering that fosters collaboration, learning, and camaraderie among peers, featuring interactive activities, competitions, and showcases to highlight talent and strengthen the departmental community.",
    imgUrl: "/sponser/img9.webp"
  },
  {
    id: "6",
    title: "AquaBots Arena",
    description: "A dynamic robotics competition where innovation meets engineering as participants design, build, and battle autonomous bots to conquer challenges in an aquatic-themed arena.",
    imgUrl: "/sponser/img10.webp"
  },
  {
    id: "7",
    title: "Brain Busters",
    description: "A stimulating quiz competition that challenges intellect and quick thinking, where participants tackle intriguing questions across diverse topics to showcase their knowledge and claim the title of quiz champion.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "8",
    title: "Case Quest",
    description: "An engaging case study competition that tests analytical skills, creativity, and strategic thinking as participants tackle real-world challenges to deliver innovative and impactful solutions.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "9",
    title: "Market Mavericks",
    description: "A dynamic event that explores the world of business and marketing, challenging participants to strategize, innovate, and showcase their entrepreneurial acumen in competitive and creative scenarios.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "10",
    title: " ROBO REALM",
    description: "An exciting robotics event where creativity and engineering collide, inviting participants to design, build, and compete with innovative robots in thrilling challenges and futuristic scenarios.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "11",
    title: "Skyward Bound",
    description: "A high-flying competition that pushes the limits of innovation and aerodynamics, where participants design and launch aircraft or drones to conquer aerial challenges and reach new heights.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "12",
    title: "Verse Voyage",
    description: "A poetic journey that invites participants to explore the power of words, expressing creativity through verses and narratives, while navigating through the realms of rhythm, rhyme, and emotion.",
    imgUrl: "/sponser/img11.webp"
  }
]

const EventCard = () => {
  // console.log(Data)
  return (
    <main className="flex mb-10 flex-col items-center lg:mt-12 mt-5 overflow-x-hidden">
      <Carousel
        plugins={[Autoplay({ delay: 1500 })]}
        opts={{
          align: "start",
        }}
        className="w-[80%]"
      >
        <CarouselContent>
          {Data.map((data, index) => (

            <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4">

              <div className=" w-[100%] h-[50vh] cursor-pointer text-white p-6 rounded-[0.8rem] scale-95 bg-white/5 border-gray-200 border-[2px] shadow-md transition-all duration-300 hover:scale-100">
                <div className="w-full h-full flex flex-col justify-center items-center text-center lg:gap-6 gap-4">
                  <h1 className="uppercase">{data.title}</h1>
                  <p className="text-justify ">{data.description}</p>
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

export default EventCard;
