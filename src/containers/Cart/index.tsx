"use client";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/providers/CartProviders";
import { Datacart, Total } from "@/components/data";

const CartPage = () => {
  const { cart } = useCart();

  const items = cart?.items || [];

  return items.length === 0 ? (
    <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
      <ShoppingCart className="text-foreground-600 mb-4" size={100} />
      <h2 className="text-2xl mb-1">Your cart is empty.</h2>
      <p>Browse our products and add items to your cart.</p>
    </div>
  ) : (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <Datacart />
      <Total source="cart" />
    </div>
  );
};

export default CartPage;
