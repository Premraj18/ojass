"use client";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";
import { images } from '../../images'

export default function () {

    return (
        <div className="w-full sm:mt-0 mt-20 bg-fixed"
            style={{
                backgroundImage: "url(" + "/img3.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="h-full w-full justify-center items-center gap-y-5 pb-5 flex flex-col [-webkit-text-stroke:0.5px_#f5f5f5] text-transparent "
                style={{
                    background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.433),rgba(2, 2, 2, 0.433))'
                }}
            >
                <div className=''>
                    <ParallaxScroll images={images} />
                </div>
            </div>
        </div>
    )

}

