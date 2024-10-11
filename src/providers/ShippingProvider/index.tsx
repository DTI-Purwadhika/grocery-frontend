"use client";
import { ShippingContextType } from "./type";
import { ChildType } from "@/shares/types";
import { useState } from "react";
import { useContext, createContext } from "react";

const ShippingContext = createContext<ShippingContextType | undefined>(undefined);

export const useShippingFee = () => {
  const context = useContext(ShippingContext);

  if (!context) {
    throw new Error("useShippingFee must be used within a ShippingProvider");
  }

  return context;
};

export const ShippingProvider = ({ children }: ChildType) => {
  const [shippingFee, setShippingFee] = useState<number>(0);

  const setShippingCost = (cost: number) => {
    setShippingFee(cost);
  };

  return (
    <>
      <ShippingContext.Provider value={{ shippingFee, setShippingCost }}>
        {children}
      </ShippingContext.Provider>
    </>
  );
};
