"use client";
import React from "react";

import { useCart } from "@/providers/CartProviders";

import PaymentButtonWrapper from "./PaymentButton/wrapper";
import CheckoutButton from "./CheckoutButton";
import { TotalType } from "./type";

const Total = ({ source }: TotalType) => {
  const { cart } = useCart();

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + (item?.product.price || 0) * item.quantity, 0) || 0;
  const shipping = 8000;
  const total = subtotal + shipping;

  return (
    <>
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
      {source === "cart" ? <CheckoutButton /> : <PaymentButtonWrapper />}
    </>
  );
};

export default Total;
