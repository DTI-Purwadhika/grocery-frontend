"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/providers/CartProviders";

import CardCart from "./Card";
import Total from "./Total";

const CartList = () => {
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
      <Listbox aria-label="Listbox menu with sections" variant="flat">
        {items.map((item) => (
          <ListboxItem key={item.product.id}>
            <CardCart cartId={Number(cart.id)} item={item} />
            <hr className="my-2" />
          </ListboxItem>
        ))}
      </Listbox>
      <Total />
    </div>
  );
};

export default CartList;
