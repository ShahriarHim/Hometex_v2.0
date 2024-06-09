import AccountRight from '@/components/layout/AccountRight'
import Link from 'next/link'
import React from 'react'
import { AiFillHome, AiFillCaretRight } from 'react-icons/ai'

const Returns = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-3 mb-10">
            <div>
                <ul className="breadcrumb flex items-center">
                    <li><a href="/"><AiFillHome /></a></li><span> <AiFillCaretRight className='mx-2' /> </span>
                    <li><a href="/">Account</a></li> <span> <AiFillCaretRight className='mx-2' /> </span>
                    <li><a href="/account/Returns">Product Returns</a></li>
                </ul>
            </div>
            {/* Left Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-5">
                <div className="col-span-4">
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='text-4xl'>Hometex</h5>
                            <p className='py-3 text-sm'>You have not made any previous returns!</p>
                        </div>
                        <div style={{ marginTop: '2rem', padding: '1.5rem 3.5rem', textAlign: 'justify' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign:'center'}}>Return & Exchange</h2>

                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>1. FOR RETURN SEND EMAIL WITH ORDER ID</h2>
                            <p>Email - "info@comfortbeddings.in" Your item must be in its original unused condition to be returned. Merchandise that has been worn, washed, used, or altered will not be accepted for return or exchange or can be a cause of refund hold.</p>

                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>2. EXCHANGES</h2>
                            <p>If your item is in like-new condition, you may exchange it for a different one. You have to share the images on "info@comfortbeddings.in" and we will arrange the reverse pickup. Once we receive the original item, we will ship the exchange product.</p>

                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>3. SENDING THE PRODUCT BACK</h2>
                            <p>Once we receive your return request, it will be approved. When the product is received and approved by our quality team, we will issue a refund equal to the amount of your purchase only. This process can take anything between 3 to 5 days.</p>

                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>4. IF WE DO NOT PROVIDE REVERSE PICKUP</h2>
                            <p>In case our courier partner does not provide reverse pickup from your location, you will need to ship it back to us. Kindly send the product back to us within 14 days of receiving it.</p>

                            {/* <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4A5568', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Back to Home</button> */}
                        </div>

                        <div className="flex items-center justify-end mr-10">
                            <Link href="/"><button className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded shadow">
                                CONTINUE
                            </button></Link>
                        </div>

                    </div>
                </div>
                {/* Right Section */}
                {/* <AccountRight /> */}
            </div>
        </div>
    )
}

export default Returns