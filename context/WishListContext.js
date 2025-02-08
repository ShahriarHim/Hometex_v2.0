"use client";
import Constant from "@/ults/Constant";
import { getCookie } from "cookies-next";
import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';

const WishListContext = createContext();
export const WishListProvider = ({ children }) => {
    const [wlist, setWlist] = useState([]);   
    

    useEffect(() => {
        setWishListToState();
    }, []);

    const setWishListToState = () => {
        const storedWishlist = localStorage.getItem("wishlist");
        try {
            setWlist(storedWishlist ? JSON.parse(storedWishlist) : []);
        } catch (error) {
            console.error("Error parsing wishlist from localStorage", error);
            setWlist([]);  // ✅ Fallback to an empty array if JSON parsing fails
        }
    };
    

    const addItemToWishlist = async ({ product_id, name, category, categoryName, sub_category, sub_categoryName, child_sub_category, child_sub_categoryName, price, image, in_stock, supplier_id, quantity = 1, sku, total_price }) => {
        const item = {
          product_id, name, category, categoryName, sub_category, sub_categoryName, child_sub_category, child_sub_categoryName, price, image, in_stock, supplier_id, quantity, sku, total_price
        };
            const isItemExist = wlist?.wlistItems?.find(
              (i) => i.product_id === item.product_id
            );
            let newWlistItems;
            if (isItemExist) {
                newWlistItems = wlist?.wlistItems?.map((i) =>
                i.product_id === isItemExist.product_id ? item : i
              );
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Updated quantity for ${name}.`,
                showConfirmButton: false,
                timer: 1500
              });
            } else {
                newWlistItems = [...(wlist?.wlistItems || []), item];
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Added ${name} to your wishlist.`,
                showConfirmButton: false,
                timer: 1500
              });
            }
        
            localStorage.setItem("wishlist", JSON.stringify(newWlistItems));
            setWlist(newWlistItems);
            setWishListToState();  
    };
  //  remove item from cart 
  const deleteItemFromWishlist = (id) => {
    const newWlistItems = wlist?.wlistItems?.filter((i) => i.product_id !== id);
    localStorage.setItem("wishlist", JSON.stringify({ wlistItems: newWlistItems }));
    setWishListToState();
  };
    return (
        <WishListContext.Provider value={{ wlist, addItemToWishlist, deleteItemFromWishlist }}>
            {children}
        </WishListContext.Provider>
    );
};

export default WishListContext;