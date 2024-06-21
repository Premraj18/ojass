"use client"
import React, { useMemo } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Data = [
  {
    id: "1",
    title: "Detail",
    description: "Platinum Sponsor",
    imgUrl: ""
  },
  {
    id: "6",
    title: "Detail",
    description: "Gold Sponsor",
    imgUrl: ""
  },
  {
    id: "7",
    title: "Detail",
    description: "Gold Sponsor",
    imgUrl: ""
  },
  {
    id: "8",
    title: "Detail",
    description: "Silver Sponsor",
    imgUrl: ""
  },
  {
    id: "9",
    title: "Detail",
    description: "Silver Sponsor",
    imgUrl: ""
  },
  {
    id: "10",
    title: "Detail",
    description: "Sponsor",
    imgUrl: ""
  },
  {
    id: "11",
    title: "Detail",
    description: "Sponsor",
    imgUrl: ""
  }
]

function EventCard() {

  const settings = useMemo(() => {
    return {
      autoplay: true,
      speed: 2500,
      autoplaySpeed: 1500,
      cssEase: "linear",
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: false,
      horizontalSwiping: true,
      swipeToSlide: true,
      pauseOnHover: true,
      variableWidth: false,

      responsive:[{
        breakpoint:600,
        settings:{
            slidesToShow:2,
            speed: 3500,
            autoplaySpeed: 2000,
        }
    }]
      
    };
  }, []);
  return (
    <div className=''>
      <Slider {...settings}>
        {Data.map((d) => (
          <div key={d.id} className="h-40 w-full rounded border-2 border-red-600  flex flex-col items-center justify-center">
            <img className="w-40" src={d.imgUrl} alt="Sunset in the mountains" style={{aspectRatio:'3/2', objectFit:'contain', }}/>
            <div className="px-6 py-4">
              <p className="text-gray-100 text-center text-base  md:text-xl">
                {d.description}
              </p>
            </div>

          </div>
        ))}

      </Slider>

    </div>
  );
}
export default EventCard

