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
    title: "VISHWA CODE GENESIS",
    description: "Electrical circuits form the foundation of power generation, and in this event, participants design and construct electrical and electronic circuits swiftly and efficiently on a breadboard.",
    imgUrl: "/sponser/skoda.webp"
  },
  {
    id: "2",
    title: "SILICON VALLEY",
    description: "Solving intricate Electrical Enginnering challenges necessitates the application of Mathematical and analytical tools, A skill set put to the test in this event that delves into the capativating realm of matlab.",
    imgUrl: "/sponser/img6.webp"
  },
  {
    id: "3",
    title: "RISE OF MACHINES",
    description: "It is crucial to control and realize the working of industrial equipment. this event deals with PLC(Programmable Logic Controller).",
    imgUrl: "/sponser/img7.webp"
  },
  {
    id: "4",
    title: "AAVARTAN",
    description: "The art of paper presentation requires study, implementation and presentation of ideas. students will need to present their ideas in a scientific and research-oriented manner.",
    imgUrl: "/sponser/img8.webp"
  },
  {
    id: "5",
    title: "AAKRITI",
    description: "I-matter offers students a unique industrial visit, providing firsthand exposure to real world technology operations, and bridging the gap between theory and practice.",
    imgUrl: "/sponser/img9.webp"
  },
  {
    id: "6",
    title: "CIRCUIT HOUSE",
    description: "This event involves a case-study in which all major decisions related to the organisation are taken. this event will bring in great white-collar experience.",
    imgUrl: "/sponser/img10.webp"
  },
  {
    id: "7",
    title: "METAMORPHICA",
    description: "Codes are the bricks on which magnificent castles can be built. this event revolves around the interesting world of competitive programming.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "8",
    title: "ARTHSHASHTRA",
    description: "This event provides students a platform to solve some problems we face in our daily lives, and thus inculcate a culture of product innovation and problem solving",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "9",
    title: "ARMAGEDDON",
    description: "Analytica is designed to evaluate participants' analytical and problem solving skills while introducing them to the trending domains of data analytics and data science.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "10",
    title: " ROBO REALM",
    description: "Placements are of utmost importance. This event tests your overall communication, technical, and aptitude skills with a subdued experience of campus placement.",
    imgUrl: "/sponser/img11.webp"
  },
  {
    id: "11",
    title: "NO GROUND ZONE",
    description: "A brain-teasing challenge, qrious is a quiz based event revolving around the dynamic universe of electrical engineering and related sciences, stimulating intellectual curiosity.",
    imgUrl: "/sponser/img11.webp"
  }
]

const EventCard = () => {

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
                <div className="w-full h-full flex flex-col justify-center items-center text-center lg:gap-8 gap-4">
                  <h1>{data.title}</h1>
                  <p>{data.description}</p>
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
