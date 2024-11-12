import React from 'react'

const page = () => {
  return (
    <>
      <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/eventbg1.jpeg')] bg-center bg-cover bg-no-repeat bg-fixed">
        <div className='min-h-[100vh] -mt-20 relative  w-full flex flex-col items-center justify-center'
          style={{
            background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.633),rgba(2, 2, 2, 0.633))'
          }}
        >
          <div className='pt-44 w-full flex justify-center items-center'>
            <img src="/abouttext2.webp" alt="" className='w-[80%] lg:w-1/3' />
          </div>
          <div className='min-h-[80vh]'>

          </div>

        </div>
      </div>
    </>
  )
}

export default page
