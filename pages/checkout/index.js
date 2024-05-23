import CartContext from '@/context/CartContext';
import Constants from '@/ults/Constant';
import React, { useContext, useState } from 'react';
import { AiFillPlusCircle, AiOutlineMinusCircle, AiFillDelete, AiOutlineLeft, AiOutlineCreditCard } from 'react-icons/ai'
import { FaPaypal } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import Link from 'next/link';

const Checkout = () => {
    const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    const cartItems = cart?.cartItems;

    const increaseQty = (cartItem) => {
        const newQty = parseInt(cartItem?.quantity) + 1;
        let price = cartItem?.price;
        let total_price = newQty * price;
        const item = { ...cartItem, quantity: newQty, total_price: total_price };
        if (newQty > Number(cartItem.stock)) return;

        addItemToCart(item);
    };

    const decreaseQty = (cartItem) => {
        const newQty = parseInt(cartItem?.quantity) - 1;
        let price = cartItem?.price;
        let total_price = newQty * price;

        const item = { ...cartItem, quantity: newQty, total_price: total_price };

        if (newQty <= 0) return;

        addItemToCart(item);
    };
    // State to track the current step
    const [step, setStep] = useState(1);

    // Function to move to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Function to move to the previous step
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const totalSum = cart?.cartItems?.reduce((accumulator, cartItem) => {
        return accumulator + parseFloat(cartItem.total_price);
    }, 0);

    // Function to render the form based on the step
    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <div className="shadow-lg p-6 rounded-lg bg-gray-50">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Details</h2>

                        <p className="font-medium text-gray-800 mb-2">Card Type</p>
                        <div className="flex justify-start items-center my-2">
                            <img src="/images/icons/mastercard.png" alt="Mastercard" className="h-12" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="cname" className="block text-sm font-medium mb-2 text-gray-700">Cardholder Name</label>
                            <input type="text" name="cname" placeholder="Mohammad Rayhan" className="border-b-2 border-gray-300 pb-2 w-full focus:outline-none focus:border-green-500 transition-colors" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="cnumber" className="block text-sm font-medium mb-2 text-gray-700">Card Number</label>
                            <input type="text" name="cnumber" placeholder="0000 0000 0000 2542" className="border-b-2 border-gray-300 pb-2 w-full focus:outline-none focus:border-green-500 transition-colors" />
                        </div>

                        <div className="flex -mx-2 mb-6">
                            <div className="px-2 w-1/2">
                                <label htmlFor="expMonth" className="block text-sm font-medium mb-2 text-gray-700">Expiry Month</label>
                                <select name="expMonth" className="border-b-2 border-gray-300 pb-2 w-full focus:outline-none focus:border-green-500 transition-colors">
                                    <option value="">Month</option>
                                    {/* Generate month options */}
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="px-2 w-1/2">
                                <label htmlFor="expYear" className="block text-sm font-medium mb-2 text-gray-700">Expiry Year</label>
                                <select name="expYear" className="border-b-2 border-gray-300 pb-2 w-full focus:outline-none focus:border-green-500 transition-colors">
                                    <option value="">Year</option>
                                    {/* Generate year options */}
                                    {Array.from(new Array(20), (_, i) => {
                                        const year = new Date().getFullYear() + i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="mb-8 w-[20%]">
                            <label htmlFor="cvv" className="block text-sm font-medium mb-2 text-gray-700">CVV</label>
                            <input type="text" name="cvv" placeholder="531" className="border-b-2 border-gray-300 pb-2 w-full focus:outline-none focus:border-green-500 transition-colors" />
                        </div>

                        <div className="flex flex-col space-y-2 mt-6 shadow-lg p-4">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:border-green-500 transition-colors">Collect in Store</button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:border-green-500 transition-colors">Gift Wrapping</button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors" type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>


                );
            case 2:
                return (
                    <div>
                        <h2>Personal Information</h2>
                        <form>
                            <div>
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" placeholder="Your Email" />
                            </div>
                            {/* Add more fields as necessary */}
                            <div>
                                <button type="button" onClick={prevStep}>Previous</button>
                                {/* Add a submit or next button here if there are more steps */}
                            </div>
                        </form>
                    </div>
                );
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <>
            <div className="container mx-auto py-20 px-36">
                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-8'>
                        <h1 className="font-bold pb-3 relative inline-block mb-3 text-xl">
                            SHOPPING BAG
                            <span className="absolute bottom-0 left-0 w-2/5 h-1 bg-yellow-500"></span>
                        </h1>
                        <div className="flex flex-col gap-4">
                            {cart?.cartItems?.map((cartItem) => (
                                <div className="flex flex-row justify-between shadow-md p-4 gap-4 bg-white rounded-lg transition duration-300 ease-in-out hover:shadow-xl">
                                    <img
                                        src={`${Constants.BASE_URL}/images/uploads/product_thumb/${cartItem.image.photo}`}
                                        alt={cartItem.name}
                                        title={cartItem.name}
                                        className="w-auto h-[200px] object-cover rounded-lg"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-xl font-semibold text-gray-800">{cartItem.name}</p>
                                        <p className="text-sm text-gray-500 pt-3">Type: {cartItem.sub_categoryName}</p>
                                        <p className="text-sm text-gray-500 pt-3">Size: {cartItem.child_sub_categoryName}</p>
                                        <p className="text-lg font-bold text-green-600 pt-3">TK {cartItem.total_price}</p>
                                        <div className="flex items-center py-2 mt-2">
                                            <button
                                                onClick={() => increaseQty(cartItem)}
                                                className="text-gray-600 hover:text-green-500 focus:outline-none"
                                                aria-label="Increase quantity"
                                            >
                                                <AiFillPlusCircle size={24} />
                                            </button>
                                            <input
                                                type="text"
                                                name={`quantity[${cartItem.product_id}]`}
                                                value={cartItem.quantity}
                                                size="3"
                                                className="mx-2 text-center form-input rounded-md border border-gray-300 w-12"
                                                readOnly
                                            />
                                            <button
                                                onClick={() => decreaseQty(cartItem)}
                                                className="text-gray-600 hover:text-red-500 focus:outline-none"
                                                aria-label="Decrease quantity"
                                            >
                                                <AiOutlineMinusCircle size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <a
                                            onClick={() => deleteItemFromCart(cartItem?.product_id)}
                                            className="text-gray-600 hover:text-red-500 cursor-pointer"
                                            aria-label="Delete item"
                                        >
                                            <BsXLg size={24} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-row justify-between px-3 mt-3 gap-10'>
                            <div>
                                <Link href="/">
                                    <button className='mt-20 flex gap-2 items-center justify-between border rounded-full px-3 py-2 font-bold'><AiOutlineLeft /> <span className='text-xl'>Continue Shopping</span></button>
                                </Link>
                            </div>
                            <div>
                                <div className='px-4 py-3 shadow-lg rounded-lg bg-white'>
                                    <div className='flex gap-28 justify-between items-center p-3'>
                                        <p className='text-gray-800 font-medium'>Subtotal</p>
                                        <p className='text-gray-900 font-semibold'>TK {totalSum}</p>
                                    </div>
                                    <div className='flex justify-between items-center p-3 border-t border-gray-200'>
                                        <p className='text-gray-800 font-medium'>Delivery</p>
                                        <p className='text-green-600 font-semibold'>Free</p>
                                    </div>
                                    <div className='flex justify-between items-center p-3 border-t border-gray-200 mt-2'>
                                        <p className='text-lg text-gray-800 font-bold'>Total</p>
                                        <p className='text-lg text-green-700 font-bold'>TK {totalSum}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='col-span-4 '>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;


