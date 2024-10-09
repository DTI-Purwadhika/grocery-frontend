"use client";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { useCart } from "@/providers/CartProviders";

import CardCart from "./Card";

const CartList = () => {
  const { cart } = useCart();

  const items = cart?.items || [];

  return (
    <Listbox aria-label="Listbox menu with sections" variant="flat">
      {items.map((item) => (
        <ListboxItem key={item.product.id}>
          <CardCart cartId={Number(cart.id)} item={item} />
          <hr className="my-2" />
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default CartList;
