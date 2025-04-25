import AccountRight from '@/components/layout/AccountRight'
import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import { AiFillHome, AiFillCaretRight, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineDelete, AiOutlineArrowLeft } from 'react-icons/ai'
import WishListContext from '@/context/WishListContext'
import CartContext from '@/context/CartContext'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishListContext);
    const { addItemToCart, addMultipleItemsToCart, cart } = useContext(CartContext);
    const router = useRouter();
    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        // Update addedToCart state based on current cart items
        const cartItems = cart?.cartItems || [];
        const newAddedToCart = {};
        cartItems.forEach(item => {
            newAddedToCart[item.product_id] = true;
        });
        setAddedToCart(newAddedToCart);
    }, [cart]);

    const handleBack = () => {
        router.back();
    };

    const addToCartHandler = (item) => {
        const cleanPrice = (priceInput) => {
            const priceString = String(priceInput);
            return Number(priceString.replace(/[^\d.]/g, ''));
        };

        const cleanedPrice = cleanPrice(item.price);
        const cleanedTotalPrice = cleanPrice(item.price);

        addItemToCart({
            product_id: item.product_id,
            name: item.name,
            price: cleanedPrice,
            image: item.image,
            quantity: 1,
            total_price: cleanedTotalPrice,
            category: item.category,
            categoryName: item.categoryName,
            sub_category: item.sub_category,
            sub_categoryName: item.sub_categoryName,
            child_sub_category: item.child_sub_category,
            child_sub_categoryName: item.child_sub_categoryName,
            in_stock: item.in_stock,
            supplier_id: item.supplier_id,
            sku: item.sku
        });
    };

    const addAllToCart = () => {
        const itemsToAdd = wishlist.filter(item => !addedToCart[item.product_id]);
        
        if (itemsToAdd.length === 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'All items are already in your cart!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        // Use the new addMultipleItemsToCart function
        addMultipleItemsToCart(itemsToAdd);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Back Button and Breadcrumb */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={handleBack}
                        className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                        <AiOutlineArrowLeft className="mr-2" />
                        Back
                    </button>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-neumorphic p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-500">{wishlist.length} items</span>
                                    {wishlist.length > 0 && (
                                        <button
                                            onClick={addAllToCart}
                                            className="px-4 py-2 bg-primary text-black rounded-lg shadow-neumorphic hover:shadow-neumorphic-inner transition-all flex items-center space-x-2"
                                        >
                                            <AiOutlineShoppingCart />
                                            <span>Add All to Cart</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {wishlist.length > 0 ? (
                                <div className="space-y-4">
                                    {wishlist.map((item) => (
                                        <div
                                            key={item.product_id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 shadow-neumorphic-inner hover:shadow-neumorphic transition-all duration-300"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                                    <p className="text-primary font-medium">BDT {item.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button 
                                                    onClick={() => removeFromWishlist(item.product_id)}
                                                    className="p-2 rounded-lg bg-white shadow-neumorphic hover:shadow-neumorphic-inner hover:bg-red-50 transition-all"
                                                    title="Remove from wishlist"
                                                >
                                                    <AiOutlineDelete className="text-xl text-red-500" />
                                                </button>
                                                {!addedToCart[item.product_id] && (
                                                    <button 
                                                        onClick={() => addToCartHandler(item)}
                                                        className="p-2 rounded-lg bg-white shadow-neumorphic hover:shadow-neumorphic-inner transition-all"
                                                        title="Add to cart"
                                                    >
                                                        <AiOutlineShoppingCart className="text-xl text-primary" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center shadow-neumorphic-inner">
                                        <AiOutlineHeart className="text-4xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                                    <p className="text-gray-500">Start adding items to your wishlist to save them for later</p>
                                    <Link 
                                        href="/products" 
                                        className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg shadow-neumorphic hover:shadow-neumorphic-inner transition-all"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist