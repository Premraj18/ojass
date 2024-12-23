"use client"
import CardEvent from './Cardevent';
import Data from "./event.json"


const aquabotsarena = () => {
    return (
        <>
            <div className=" w-[95%] h-[80vh] cursor-pointer text-white p-6 rounded-[0.8rem] scale-95 bg-white/10 border-gray-200 border-[1px] shadow-md">
                <h2 className="text-center text-3xl lg:text-5xl mb-5">AquaBots Arena</h2>
                <CardEvent data={Data[1]}/>
            </div>
        </>
    )
}

export default aquabotsarena
