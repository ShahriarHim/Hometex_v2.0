import CartContext from '@/context/CartContext';
import Constants from '@/ults/Constant';
import { AiFillPlusCircle, AiOutlineMinusCircle, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsXLg } from "react-icons/bs";
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import LoginPopUp from '@/components/layout/LoginPopup';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showGiftCardModal, setShowGiftCardModal] = useState(false);
    const cartItems = cart?.cartItems;
    const [giftCardCode, setGiftCardCode] = useState('');
    const router = useRouter();
    const formData = router.query;

    // useEffect(() => {
    //     console.log(cartItems)
    //     console.log("Form Data: ", formData);
    //   }, [formData]);
    let auth_token = getCookie("home_text_token");
    const [discountedTotal, setDiscountedTotal] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

    let sumTotal = 0;
    cart?.cartItems?.map((cartItem) => (
        sumTotal += cartItem.total_price
    ));

    useEffect(() => {
        if (cartItems) {
            const finalAmount = cartItems.reduce((total, cartItem) => {
                let str = String(cartItem.price);
                str = str.replace(/[,]/g, "");
                const amount = parseInt(str) * cartItem.quantity;
                return total + amount;
            }, 0);
            setTotalPrice(finalAmount);
        }
    }, [cartItems]);

    const handleApplyGiftCard = () => {
        if (giftCardCode.toLowerCase() === 'hometex') {
            const newDiscountedTotal = totalPrice * 0.9;
            setDiscountedTotal(newDiscountedTotal);
        }
        setGiftCardCode('');
        setShowGiftCardModal(false);
    };

    const toggleGiftCardModal = () => {
        setShowGiftCardModal(!showGiftCardModal);
    };

    const renderGiftCardModal = () => {
        if (!showGiftCardModal) return null;

        return (
            <div className="fixed inset-0 flex justify-center items-center rounded-2xl bg-gray-800/50 backdrop-blur-sm z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-md w-full mx-4"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Gift Card / Coupon</h2>
                        <button
                            onClick={toggleGiftCardModal}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <BsXLg />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={giftCardCode}
                                onChange={(e) => setGiftCardCode(e.target.value)}
                                placeholder="Enter gift card or coupon code"
                                className="w-full py-3 px-4 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 -z-10 blur-sm"></div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={toggleGiftCardModal}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 text-gray-700 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApplyGiftCard}
                                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950 text-white rounded-xl transition-all duration-300 font-medium"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    const handleNext = () => {
        if (!auth_token) {
            setShowConfirmationModal(true);
            return;
        }
        router.push({
            pathname: '/payment_method',
            query: {
                ...formData,
                cartItems: JSON.stringify(cartItems),
                totalPrice,
                discountedTotal: discountedTotal || totalPrice,
            },
        });
    };

    const handleConfirmation = () => {
        setShowConfirmationModal(false);
        setShowLoginModal(true);
    };

    const toggleLoginPopup = () => {
        setShowLoginModal(!showLoginModal);
    };

    const renderConfirmationModal = () => {
        if (!showConfirmationModal) return null;

        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Oops!</h2>
                    <p className="mb-4">We need your information for payment. Please login to continue.</p>
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => setShowConfirmationModal(false)} 
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleConfirmation}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="max-w-screen-xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg max-w-3xl mx-auto">
                            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                                Shopping Bag
                                <span className="block w-20 h-1 bg-gray-800 mt-2 rounded-full"></span>
                            </h1>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                                {cart?.cartItems?.map((cartItem) => (
                                    <motion.div
                                        key={cartItem.product_id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <img
                                            src={cartItem.image}
                                            alt={cartItem.name}
                                            title={cartItem.name}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                        <div className="flex-grow space-y-3">
                                            <h3 className="text-xl font-semibold text-gray-800">{cartItem.name}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <p>Type: {cartItem.sub_categoryName}</p>
                                                <p>Size: {cartItem.child_sub_categoryName}</p>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">TK {cartItem.price}</p>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2 bg-gray-50/80 p-2 rounded-xl">
                                                    <button
                                                        onClick={() => decreaseQty(cartItem)}
                                                        className="p-1 rounded-lg hover:bg-gray-100 transition-all"
                                                    >
                                                        <AiOutlineMinusCircle className="text-gray-600" />
                                                    </button>
                                                    <span className="px-3 py-1 font-medium">{cartItem.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQty(cartItem)}
                                                        className="p-1 rounded-lg hover:bg-gray-100 transition-all"
                                                    >
                                                        <AiFillPlusCircle className="text-gray-600" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => deleteItemFromCart(cartItem?.product_id)}
                                                    className="p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100 transition-all"
                                                >
                                                    <BsXLg className="text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-700 font-medium">Subtotal</p>
                                            <p className="text-gray-900 font-semibold">TK {totalPrice}</p>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                            <p className="text-gray-700 font-medium">Delivery</p>
                                            <p className="text-green-600 font-semibold">Free</p>
                                        </div>
                                        <button
                                            onClick={toggleGiftCardModal}
                                            className="w-full py-3 px-4 bg-gradient-to-r from-gray-100/80 to-gray-200/80 hover:from-gray-200/80 hover:to-gray-300/80 rounded-xl transition-all duration-300 text-gray-700 font-medium"
                                        >
                                            Apply Gift Card / Coupon
                                        </button>
                                        {renderGiftCardModal()}
                                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                            <p className="text-xl font-bold text-gray-800">Total</p>
                                            <p className="text-xl font-bold text-gray-900">
                                                TK {discountedTotal ? discountedTotal : totalPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                                    <Link href="/">
                                        <button className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2">
                                            <AiOutlineLeft />
                                            <span>Continue Shopping</span>
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleNext}
                                        className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>Next</span>
                                        <AiOutlineRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {renderConfirmationModal()}
            {showLoginModal && <LoginPopUp showPopup={showLoginModal} togglePopup={toggleLoginPopup} />}
        </>
    );
};

export default Checkout;
