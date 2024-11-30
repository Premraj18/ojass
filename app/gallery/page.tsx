"use client";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";
import { images } from '../../images'

export default function Page() {

    return (
        <div className="w-full sm:pt-20 pt-20 bg-fixed"
            style={{
                backgroundImage: "url(" + "/img3.webp" + ")",
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
                {/* <div className=''>
                    <iframe className='w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl' src="https://www.youtube.com/embed/v025irxdSmk?si=QualeiZb-NDBwE_D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div> */}
            </div>
        </div>
    )

}

