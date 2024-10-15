"use client";
import { useRouter } from "next/navigation";

import { Datacheckout, Total } from "@/components/data";
import { useCart } from "@/providers/CartProviders";

const Checkout = () => {
  const { cartCount } = useCart();
  const router = useRouter();

  if (cartCount === 0) router.replace("/my-cart");

  return (
    <div className="grid grid-rows-[1fr_auto] h-full gap-4 lg:gap-2">
      <Datacheckout />
      <Total source="checkout" />
    </div>
  );
};

export default Checkout;
