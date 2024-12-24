"use client"
import React from 'react'
import ViswaCodeGenesis from './viswaCodeGenesis'
import SiliconValley from './siliconvalley'
import AquaBotsArena from './aquabotsArena'
import BrainBusters from './brainbusters'
import CaseQuest from './caseQuest'
import CryptoCraft from './cryptocraft'
import Department from './departmentevent'
import Game from './gamecrafts'

const Page = () => {
  return (
    <>
      <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/eventbg1.webp')]  bg-center bg-cover bg-no-repeat bg-fixed">
        <div className='min-h-[100vh] -mt-20 relative  w-full flex flex-col items-center justify-center'
          style={{
            background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.533),rgba(2, 2, 2, 0.533))'
          }}
        >
          <div className='pt-60 pb-10 w-full flex justify-center items-center'>
            <img src="/eventtext.webp" alt="" className='w-[80%] lg:w-[25%]' />
          </div>
          <div className='min-h-[90vh] w-full my-5 flex items-start justify-center'>
            <ViswaCodeGenesis/>
          </div>
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <Game/>
          </div>
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <CryptoCraft/>
          </div>
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <Department/>
          </div>
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <AquaBotsArena/>
          </div>
          {/* <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <SiliconValley/>
          </div> */}
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <BrainBusters/>
          </div>
          <div className='min-h-[80vh] w-full my-5 flex items-start justify-center'>
            <CaseQuest/>
          </div>
          

        </div>
      </div>
    </>
  )
}

export default Page
