"use client";

import { CartContext } from "./CartContest";

import { useState, useEffect } from "react";

function CartContextProvider({ children }) {
  const [CartData, setCartData] = useState([]);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("cart");
  //   if (storedData) {
  //     setCartData(JSON.parse(storedData));
  //   }
  // }, []);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("cart");
      if (storedData && storedData !== "undefined") {
        setCartData(JSON.parse(storedData));
      }
    } catch {
      setCartData([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(CartData));
  }, [CartData]);

  const datas = { CartData, setCartData };

  return <CartContext.Provider value={datas}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
