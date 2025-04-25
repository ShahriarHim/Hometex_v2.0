import CartContext from '@/context/CartContext';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiFillPlusCircle, AiOutlineMinusCircle, AiOutlineDelete, AiOutlineShopping, AiOutlineCreditCard } from 'react-icons/ai';
import { BsXLg } from "react-icons/bs";

const CartPage = () => {
    const { cart, addItemToCart, deleteItemFromCart, clearCart } = useContext(CartContext);
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

    useEffect(() => {
        if (cartItems) {
            const finalAmount = cartItems.reduce((total, cartItem) => {
                let price = cartItem.price;
                if (typeof price === 'string') {
                    price = price.replace(/^TK\s+/, '').replace(/,/g, '');
                }
                const amount = parseFloat(price) * cartItem.quantity;
                return isNaN(amount) ? total : total + amount;
            }, 0);
            setTotalPrice(finalAmount);
        }
    }, [cartItems]);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-neumorphic p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-500">{cartItems?.length || 0} items</span>
                                    {cartItems?.length > 0 && (
                                        <button
                                            onClick={clearCart}
                                            className="text-red-500 hover:text-red-600 flex items-center space-x-1"
                                        >
                                            <AiOutlineDelete />
                                            <span>Clear Cart</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {cartItems?.length > 0 ? (
                                <div className="space-y-4">
                                    {cartItems.map((cartItem) => (
                                        <div
                                            key={cartItem.product_id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 shadow-neumorphic-inner hover:shadow-neumorphic transition-all duration-300"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <img
                                                        src={cartItem.image}
                                                        alt={cartItem.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-6">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">{cartItem.name}</h3>
                                                        <p className="text-primary font-medium">BDT {cartItem.price}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-700 font-medium">{cartItem.sub_categoryName}</p>
                                                        <p className="text-sm text-gray-500">{cartItem.child_sub_categoryName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-neumorphic">
                                                    <button
                                                        onClick={() => decreaseQty(cartItem)}
                                                        className="p-1 rounded-lg hover:bg-gray-100 transition-all"
                                                    >
                                                        <AiOutlineMinusCircle className="text-primary" />
                                                    </button>
                                                    <span className="px-3 py-1">
                                                        {cartItem.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => increaseQty(cartItem)}
                                                        className="p-1 rounded-lg hover:bg-gray-100 transition-all"
                                                    >
                                                        <AiFillPlusCircle className="text-primary" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => deleteItemFromCart(cartItem.product_id)}
                                                    className="p-2 rounded-lg bg-white shadow-neumorphic hover:shadow-neumorphic-inner hover:bg-red-50 transition-all"
                                                    title="Remove from cart"
                                                >
                                                    <AiOutlineDelete className="text-xl text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center shadow-neumorphic-inner">
                                        <BsXLg className="text-4xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500">Start adding items to your cart</p>
                                    <Link 
                                        href="/products" 
                                        className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg shadow-neumorphic hover:shadow-neumorphic-inner transition-all"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            )}

                            {cartItems?.length > 0 && (
                                <div className="mt-8 pt-6 border-t">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-xl font-bold text-primary">BDT {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <Link
                                            href="/"
                                            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-neumorphic hover:shadow-neumorphic-inner transition-all flex items-center space-x-2 text-sm"
                                        >
                                            <AiOutlineShopping />
                                            <span>Continue Shopping</span>
                                        </Link>
                                        <Link
                                            href="/Checkout"
                                            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-neumorphic hover:shadow-neumorphic-inner transition-all flex items-center space-x-2 text-sm"
                                        >
                                            <AiOutlineCreditCard />
                                            <span>Checkout</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
