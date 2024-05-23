import React from 'react'

const Giftsomeone = () => {
    return (
        <>
            <div className='container mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className='md:pl-[200px] md:pt-10'>
                        <h1 className='text-xl font-bold'>Digital Gift Card</h1>
                        <h5 className='pt-4'>Chose a design</h5>
                        <div className='flex gap-3 pt-2'>
                            <img src="/images/icons/gift-card.png" alt="" className='h-24' />
                            <img src="/images/icons/gift-card.png" alt="" className='h-24' />
                            <img src="/images/icons/gift-card.png" alt="" className='h-24' />
                        </div>
                        <div className='flex flex-col pt-3'>
                            <label htmlFor="remail">Who's the lucky recipient?</label>
                            <input type="email" name='remail' placeholder='Recipint email' className='py-3 px-3 border w-[80%] mt-2 rounded-md' />
                        </div>

                        <div className='pt-3'>
                            <h5 className='pt-4'>Choose a card value</h5>
                            <div className='flex flex-wrap items-center gap-3 md:w-[60%]'>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 500</button>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 1000</button>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 1500</button>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 2000</button>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 2500</button>
                                <button className='px-2 py-1 rounded-full border mt-2 hover:bg-slate-400 hover:text-white'>BDT 3000</button>
                            </div>
                        </div>

                        <div className='flex flex-col pt-3'>
                            <label htmlFor="gmessage">Gift message (optional)</label>
                            <textarea type="text" rows="4" name='gmessage' placeholder='Add a perrsonal note' className='py-3 px-3 border md:w-[80%] mt-2 rounded-md' />
                        </div>
                        <div className='flex flex-col pt-3'>
                            <label htmlFor="gmessage">When should we send the Gift Card?</label>
                            <div className="flex flex-row items-center">
                                <div className="flex items-center mr-4">
                                    <input type="radio" id="sendToday" name="sendTime" value="today" />
                                    <label htmlFor="sendToday" className="ml-2">Today</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="sendNow" name="sendTime" value="now" />
                                    <label htmlFor="sendNow" className="ml-2">Now</label>
                                </div>
                                <div className="flex items-center mx-3 border-b">
                                    <input type="date" id="customDate" name="customDate"  />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col pt-3'>
                            <label htmlFor="sName">Who is it from?</label>
                            <input type="text" name='sName' placeholder='Sender&apos;s name' className='py-3 px-3 border md:w-[80%] mt-2 rounded-md' />
                        </div>

                        <div className='flex justify-center bg-pink-500 hover:bg-pink-600 rounded-lg md:w-[80%] mt-4'>
                        <button className='py-2 text-white '>Buy now</button>
                        </div>
                        <p className='md:w-[80%] text-center pt-2'>Delivery by email, this gift card never expires</p>

                        <div className='my-10 md:w-[80%]'>
                            <div className='border-t text-justify pt-2'>
                                <p> <span className='font-semibold underline'>Switch</span> to our tile-count gift card, where you purchase based on the number of tiles you want to give</p>
                            </div>

                        </div>
                    
                    </div>
                    <div className='flex justify-center items-center bg-[#f7f6ee]'>
                        <img src="/images/icons/gift-card.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Giftsomeone