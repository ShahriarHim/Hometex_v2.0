import React from 'react';
import { SlSpeedometer } from "react-icons/sl";

const CorporateDetails = () => {
  return (
    <>
      <div className="relative bg-[url('/images/corporate-details/corporate-details.jpg')] h-[40vh] bg-cover bg-no-repeat bg-center flex items-center">
        <div className='container mx-auto px-4'>
          <div className="text-left max-w-lg"> {/* Adjusting text alignment and width for better readability */}
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 md:mb-4">Our Corporate Vision</h1>
            <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out">Discover More</button>
          </div>
          {/* Overlay section with improved spacing and layout */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full px-4">
            <div className='flex flex-wrap justify-center gap-4 md:gap-8'>
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                  <div className="mr-4 text-red-500">
                    {/* Icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Innovative Solutions</h2>
                    <p>Leading the future of the industry.</p>
                  </div>
                </div>
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                  <div className="mr-4 text-red-500">
                    {/* Icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Innovative Solutions</h2>
                    <p>Leading the future of the industry.</p>
                  </div>
                </div>
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                  <div className="mr-4 text-red-500">
                    {/* Icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Innovative Solutions</h2>
                    <p>Leading the future of the industry.</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>


      <div className='bg-yellow-50'>
        <div className='container mx-auto pt-24 pb-10 px-5'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
            <div>
              <img src="/images/corporate-details/cd-1.jpg" alt="cd1" className='float-right' />
            </div>
            <div className='w-full md:w-[65%]'>
              <h4 className='py-1'>Background time</h4>
              <h1 className='text-4xl font-bold py-3'>We Boast of Customized User Experience</h1>
              <p className='py-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla tenetur aut neque impedit? Ea veritatis, suscipit facere delectus odio eaque quaerat recusandae repellendus hic, quam placeat deserunt nemo aut nostrum.</p>
              <button className='rounded-full px-8 py-2 bg-red-500 text-white mt-4'>Read more</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container mx-auto flex flex-col justify-center items-center text-center py-10 px-5'>
          <h5 className='text-sm'>Why our Company?</h5>
          <h2 className='text-4xl font-semibold py-5'>We Deliver Dreams that Matches Aspirations</h2>
          <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam commodi vero perspiciatis!</p>
          <div className=' container mx-auto flex flex-col md:flex-row gap-3 mt-5 w-full md:w-[70%] justify-center'>
            <div className='flex-1 md:flex-none rounded-lg flex flex-col gap-5 justify-center items-center border p-5'>
              <SlSpeedometer className='text-3xl' />
              <h1 className='text-xl font-semibold'>Strategy</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex-1 md:flex-none rounded-lg flex flex-col gap-5 justify-center items-center border p-5'>
              <SlSpeedometer className='text-3xl' />
              <h1 className='text-xl font-semibold'>Marketing</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex-1 md:flex-none rounded-lg flex flex-col gap-5 justify-center items-center border p-5'>
              <SlSpeedometer className='text-3xl' />
              <h1 className='text-xl font-semibold'>Organisation</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex-1 md:flex-none rounded-lg flex flex-col gap-5 justify-center items-center border p-5'>
              <SlSpeedometer className='text-3xl' />
              <h1 className='text-xl font-semibold'>Optimization</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>

        <div className='container mx-auto py-10 px-5'>
          <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
            <div className='md:w-1/2'>
              <div className='md:float-right py-10 text-justify'>
                <h5 className='text-sm'>Lorem ipsum dolor sit amet.</h5>
                <h2 className='text-4xl font-semibold py-5'>Performance Delivered on Time</h2>
                <p className='text-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum dolores ducimus iure quia, consectetur est illum? Animi, sunt, debitis similique cum deserunt quia, omnis qui itaque laboriosam iure fugit! Debitis!</p>
                <button className='rounded-full px-8 py-2 bg-red-500 text-white mt-4'>Read more</button>
              </div>
            </div>
            <div className='relative'>
              <div className='bg-red-400 w-96 h-64 ml-auto relative overflow-visible'>
                <img src="/images/corporate-details/cd-1.jpg" alt="" className='absolute top-[-20px] right-[-20px] w-full h-full' />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center justify-center shadow-md rounded-lg py-8">
              <h2 className="text-3xl font-semibold">2M+</h2>
              <p className="text-xl text-red-500">Available Customers</p>
            </div>
            <div className="flex flex-col items-center justify-center shadow-md rounded-lg py-8">
              <h2 className="text-3xl font-semibold">200+</h2>
              <p className="text-xl text-red-500">Corporate Clients</p>
            </div>
            <div className="flex flex-col items-center justify-center shadow-md rounded-lg py-8">
              <h2 className="text-3xl font-semibold">100+</h2>
              <p className="text-xl text-red-500">Government Clients</p>
            </div>
          </div>
        </div>
        <div className='py-10 text-center'>
          <h5 className='text-sm uppercase text-gray-600'>Our Company</h5>
          <h2 className='text-4xl font-semibold py-3'>Latest Works</h2>
          <div className='max-w-4xl mx-auto'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5'>
              <img src="/images/corporate-details/co-2.jpg" alt="" className='col-span-2 sm:col-span-1 sm:row-span-2 w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:shadow-lg' />
              <img src="/images/corporate-details/co-3.jpg" alt="" className='w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:shadow-lg' />
              <img src="/images/corporate-details/co-4.jpg" alt="" className='w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:shadow-lg' />
              <img src="/images/corporate-details/co-5.jpg" alt="" className='col-span-2 sm:col-span-1 w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:shadow-lg' />
              <img src="/images/corporate-details/co-6.jpg" alt="" className='w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:shadow-lg' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateDetails;
