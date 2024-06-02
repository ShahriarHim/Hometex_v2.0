import CartContext from '@/context/CartContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiFillPlusCircle, AiOutlineLeft, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsXLg } from "react-icons/bs";



const CartPage = () => {

    const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);

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


    // const [showContentcuppon, setShowContentcuppon] = useState(false);
    // const [showContentShipping, setShowContentShipping] = useState(false);
    // const [showContentCertificate, setShowContentCertificate] = useState(false);

    // const toggleContentCuppon = () => {
    //     setShowContentcuppon(!showContentcuppon);
    // };
    // const toggleContentShipping = () => {
    //     setShowContentShipping(!showContentShipping);
    // };
    // const toggleContentCertificate = () => {
    //     setShowContentCertificate(!showContentCertificate);
    // };

    let sumTotal = 0;

    cart?.cartItems?.map((cartItem) => (
        sumTotal += cartItem.total_price
    ))

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cartItems) {
          const finalAmount = cartItems.reduce((total, cartItem) => {
            let str = cartItem.price;
            str = str.replace(/[,]/g, "");
            const amount = parseInt(str) * cartItem.quantity;
            return total + amount;
          }, 0);
          setTotalPrice(finalAmount);
        }
      }, [cartItems]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <img src="/images/hometex-logo.png" alt="Logo" className="w-32 h-32" />
            </div>
        );
    }


    return (
        <>
            <div className='container mx-auto py-10'>
                <div className="grid grid-cols-12 gap-4 justify-between">
                    <div className='col-span-8'>
                        <h1 className='text-4xl font-bold'>Shopping Cart.</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-50">
                                    <tr className="text-left text-gray-600">
                                        <th className="py-4 px-6 font-bold uppercase">Product</th>
                                        <th className="py-4 px-6 font-bold uppercase">Size</th>
                                        <th className="py-4 px-6 font-bold uppercase text-center">Quantity</th>
                                        <th className="py-4 px-6 font-bold uppercase">Total Price</th>
                                        <th className="py-4 px-6 font-bold uppercase"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cart?.cartItems?.map((cartItem) => (
                                        <tr className="text-gray-700 border-b">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <a href="#" className="flex-shrink-0">
                                                        <img
                                                            src={cartItem.image}
                                                            alt={cartItem.name}
                                                            title={cartItem.name}
                                                            className="w-24 h-24 object-cover rounded-md border border-gray-200"
                                                        />
                                                    </a>
                                                    <div className="ml-4">
                                                        <div className="text-md font-bold text-gray-900">{cartItem.name} <br /> <span className='text-gray-300 text-sm font-normal'>{cartItem.sub_categoryName}</span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">{cartItem.child_sub_categoryName}</td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center justify-center bg-gray-100 py-2 rounded-full">
                                                    <button
                                                        onClick={() => decreaseQty(cartItem)}
                                                        className="text-gray-600 hover:text-red-900"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <AiOutlineMinusCircle size={24} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        name={`quantity[${cartItem.product_id}]`}
                                                        value={cartItem.quantity}
                                                        size="3"
                                                        className="mx-2 text-center form-input rounded-md border-gray-300 w-12"
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => increaseQty(cartItem)}
                                                        className="text-gray-600 hover:text-green-900"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <AiFillPlusCircle size={24} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">TK {cartItem.price}</td>
                                            <td className="py-4 px-6">
                                                <a
                                                    onClick={() => deleteItemFromCart(cartItem?.product_id)}
                                                    className="text-gray-600 hover:text-red-900 cursor-pointer"
                                                    aria-label="Delete item"
                                                >
                                                    <BsXLg size={24} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xl font-bold text-center pt-3'>Total</td>
                                        <td className='text-xl font-bold pt-3' > TK {totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Link href="/">
                    <button className='mt-20 flex gap-2 items-center justify-between border rounded-full px-3 py-2 font-bold'><AiOutlineLeft /> <span className='text-xl'>Continue Shopping</span></button>
                </Link>
            </div>
            {/* <div className='col-span-3 rounded-xl bg-gray-600 text-white'>
                        <div className='px-5 py-3'>
                            <h1 className='font-bold text-4xl pb-4 border-b'>Payment info.</h1>
                            <div className='py-5 border-b'>
                                <h3 className='text-sm text-gray-200 pb-3'>Payment Method:</h3>
                                <div className='flex flex-auto justify-center gap-5 items-center'>
                                    <div className='flex gap-2 items-center border px-4 py-2 rounded-full mt-2 text-lg'><AiOutlineCreditCard /> Credit card</div>
                                    <div className='flex gap-2 items-center border px-8 py-2 rounded-full mt-2 font-bold italic text-lg'><FaPaypal /> PayPal</div>
                                </div>
                            </div>
                            <div className='py-3'>
                                <h3 className='text-sm text-gray-200 pb-2'>Name on Card:</h3>
                                <input type="text" id="fname" name="fname" placeholder='Mohammad Rayhan' className='w-full text-md tracking-widest bg-gray-600 pb-2 border-b' />
                            </div>
                            <div className='py-3'>
                                <h3 className='text-sm text-gray-200 pb-2'>Card Number:</h3>
                                <input type="number" id="cnumber" name="cnumber" placeholder='.... .... .... 3271' className='w-full text-md tracking-widest bg-gray-600 pb-2 border-b' />
                            </div>
                            <div className='py-3 flex flex-wrap items-center gap-4 p-4'>
                                <div className="flex-1">
                                    <h3 className='text-sm text-gray-200 pb-2'>Expiration Date:</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <select
                                                id="expirationMonth"
                                                name="expirationMonth"
                                                className="appearance-none w-full bg-gray-600 border-b text-white text-md tracking-widest py-2 pl-5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600"
                                            >
                                                <option value="">MM</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i} value={i + 1}>
                                                        {`${i + 1}`.padStart(2, '0')}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <input
                                            type="number"
                                            id="expirationYear"
                                            name="expirationYear"
                                            placeholder="YYYY"
                                            className="flex-1 bg-gray-600 text-white text-md tracking-widest py-2 pl-3 pr-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600"
                                            min="1900"
                                            max="2100"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className='text-sm text-gray-200 pb-2'>CVV:</h3>
                                    <input
                                        type="number"
                                        id="cvv"
                                        name="cvv"
                                        placeholder='XXX'
                                        className='w-full text-md tracking-widest bg-gray-600 text-white py-2 pl-3 pr-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600'
                                    />
                                </div>
                            </div>

                            <Link href="/checkout" className='flex justify-center items-center pt-14 pb-4'><button className='bg-blue-600 rounded-full px-20 py-3 text-lg font-bold'>Check Out.</button></Link>

                        </div>
                    </div> */}




            {/* <div className="max-w-screen-xl mx-auto px-3 mb-5">
                <h1 className="text-3xl font-bold mb-4 text-center">Hometex Bangladesh Cart</h1>
                <div className="overflow-x-auto">
                    <table className="mx-auto max-w-2xl w-full whitespace-nowrap rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-gray-600">
                                <th className="py-3 px-4 font-bold uppercase">Image</th>
                                <th className="py-3 px-4 font-bold uppercase">Product Name</th>
                                <th className="py-3 px-4 font-bold uppercase">Model</th>
                                <th className="py-3 px-4 font-bold uppercase">Quantity</th>
                                <th className="py-3 px-4 font-bold uppercase text-right">Unit Price</th>
                                <th className="py-3 px-4 font-bold uppercase text-right">Total</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {cart?.cartItems?.map((cartItem) => (
                                <>
                                    <tr className="text-gray-700">
                                        <td className="py-3 px-4 text-center">
                                            <a href="#">
                                                <img
                                                    src={`${Constants.BASE_URL}/images/uploads/product_thumb/${cartItem.image.photo}`}
                                                    alt={cartItem.name}
                                                    title={cartItem.name}
                                                    className="inline-block w-20 h-12 object-cover rounded-md"
                                                />
                                            </a>
                                        </td>
                                        <td className="py-3 px-4">
                                            <a href="/">{cartItem.name}</a>
                                            <br />
                                            <small>Bed Sheet Size: King 90" X 100..</small>
                                        </td>
                                        <td className="py-3 px-4">{cartItem.model}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="text"
                                                    name="quantity[11903]"
                                                    value={cartItem.quantity}
                                                    size="1"
                                                    // onChange={(e)=>{  }}
                                                    className="form-input w-16"
                                                />
                                                <div className="flex flex-col ml-2">
                                                    <button
                                                        type="submit"
                                                        data-toggle="tooltip"
                                                        title="Update"
                                                        onClick={(e) => { increaseQty(cartItem) }}
                                                        className="px-4 py-2 inline-block text-green-600 bg-white rounded-md hover:bg-gray-100 cursor-pointer"

                                                    >
                                                        <AiFillPlusCircle />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-toggle="tooltip"
                                                        title="Remove"
                                                        onClick={(e) => { decreaseQty(cartItem) }}
                                                        className="px-4 py-2 inline-block text-red-600 bg-white rounded-md hover:bg-gray-100 cursor-pointer"

                                                    >
                                                        <AiOutlineMinusCircle />
                                                    </button>

                                                    <a
                                                        className="px-4 py-2 inline-block text-red-600 bg-white rounded-md hover:bg-gray-100 cursor-pointer"
                                                        onClick={() =>
                                                            deleteItemFromCart(cartItem?.product_id)
                                                        }
                                                    >
                                                        <AiFillDelete />
                                                    </a>


                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">TK {cartItem.price}</td>
                                        <td className="py-3 px-4 text-right">TK {cartItem.total_price}</td>
                                    </tr>
                                </>

                            ))}

                        </tbody>
                    </table>
                </div>

                <div className='m-8'>
                    <h2 className="text-3xl">What would you like to do next?</h2>
                    <h5>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</h5>
                </div>

                <div>
                    <div className="p-4">
                        <div
                            className="border-2 m-2 flex items-center justify-between cursor-pointer"
                            onClick={toggleContentCuppon}
                        >
                            <h2 className="pl-5 text-lg font-medium">Use Coupon Code</h2>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={`h-6 w-6 transform ${showContentcuppon ? 'rotate-180' : ''
                                    } transition-transform duration-300`}
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                                />
                            </svg>
                        </div>
                        {showContentcuppon && (
                            <div className="mt-4 pl-5">
                                <label className="block mb-2 font-bold text-gray-700" htmlFor="input-coupon">
                                    Enter your coupon here
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="coupon"
                                        id="input-coupon"
                                        placeholder="Enter your coupon here"
                                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                                    />
                                    <span className="input-group-btn">
                                        <button
                                            type="button"
                                            id="button-coupon"
                                            className="px-4 py-0.5 text-white text-sm bg-blue-500 hover:bg-blue-600"
                                            data-loading-text="Loading..."
                                        >
                                            Apply Coupon
                                        </button>
                                    </span>
                                </div>

                            </div>
                        )}

                        <div
                            className="border-2 m-2 flex items-center justify-between cursor-pointer mt-4"
                            onClick={toggleContentShipping}
                        >
                            <h2 className="pl-5 text-lg font-medium">Estimate Shipping & Taxes</h2>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={`h-6 w-6 transform ${showContentShipping ? 'rotate-180' : ''
                                    } transition-transform duration-300`}
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                                />
                            </svg>
                        </div>
                        {showContentShipping && (
                            <div className="mt-4 pl-5">
                                <p>This is the content that will be shown and hidden.</p>
                            </div>
                        )}

                        <div
                            className=" border-2 m-2 flex items-center justify-between cursor-pointer mt-4"
                            onClick={toggleContentCertificate}
                        >
                            <h2 className="text-lg font-medium pl-5">Use Gift Certificate</h2>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={`h-6 w-6 transform ${showContentCertificate ? 'rotate-180' : ''
                                    } transition-transform duration-300`}
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                                />
                            </svg>
                        </div>
                        {showContentCertificate && (
                            <div className="mt-4 pl-5">
                                <p>This is the content that will be shown and hidden.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div class="flex justify-end mb-5">
                    <div class="w-1/2">
                        <table class="md:float-right md:w-96 w-full mt-10 border border-gray-400 shadow-lg">
                            <tbody>
                                <tr>
                                    <td class="text-right font-medium py-2 pr-4">Sub-Total:</td>
                                    <td class="text-right py-2 pr-4 md:pr-8">TK {sumTotal}</td>
                                </tr>
                                <tr>
                                    <td class="text-right font-medium py-2 pr-4">Total:</td>
                                    <td class="text-right py-2 pr-4 md:pr-8">TK {sumTotal} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between">
                    <a href="/" className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none">
                        Continue Shopping
                    </a>
                    <Link href="/checkout" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
                        Checkout
                    </Link>
                </div>
            </div> */}
        </>

    )
}

export default CartPage
