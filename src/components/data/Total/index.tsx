"use client";
import { Button } from "@nextui-org/button";
import { CreditCard, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/providers/CartProviders";
import restService from "@/services/restService";

export type TotalType = {
  source: "cart" | "checkout";
  action?: () => void;
};

const Total = ({ source, action }: TotalType) => {
  const [url, setUrl] = useState("/my-cart/checkout");
  const { cart } = useCart();

  useEffect(() => {
    const fetchUrl = async () => {
      const endpoint = `checkouts/1`;
      const { resultData } = await restService(endpoint, "POST");

      setUrl(resultData.invoiceUrl);
    };

    if (source !== "cart") fetchUrl();
  }, []);

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + (item?.product.price || 0) * item.quantity, 0) || 0;
  const shipping = 8000;
  const total = subtotal + shipping;

  const checkoutButton = (
    <>
      <ShoppingCart /> Continue to Checkout
    </>
  );

  const paymentButton = (
    <>
      <CreditCard /> Proceed to Payment
    </>
  );

  return (
    <div>
      <div className="flex flex-row justify-between">
        <span>Subtotal</span>
        <span>: Rp {subtotal},-</span>
      </div>
      <div className="flex flex-row justify-between my-2">
        <span>Shipping</span>
        <span>: Rp {shipping},-</span>
      </div>
      <hr className="my-3" />
      <div className="flex flex-row justify-between font-semibold text-lg">
        <span>Total</span>
        <span>: Rp {total},-</span>
      </div>
      <Button
        as={Link}
        className="w-full mt-6 mb-4"
        color="primary"
        href={url}
        radius="sm"
        size="lg"
        onClick={action}
      >
        {source === "cart" ? checkoutButton : paymentButton}
      </Button>
    </div>
  );
};

export default Total;
