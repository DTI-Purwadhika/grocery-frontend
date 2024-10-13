import Image from "next/image";
import React from "react";
import { IoMdMail } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";

import jne from "../../../../public/jne.png";
import tiki from "../../../../public/tiki.png";
import pos from "../../../../public/pos.png";

export const FooterHome: React.FC = () => {
  return (
    <>
      <footer className="p-5 lg:px-24 lg:py-5 bg-green-500">
        <div className="grid grid-cols-1 gap-10 lg:gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4 ">
            <p className="text-white font-semibold text-medium lg:text-lg">
              Grocery, a fresh supermarket that has been trusted by households, chefs, and farmers.
              Explore a large variety of fresh and all natural fruits and vegetables. By shopping at
              Grocery, you&apos;re also supporting our local farmers.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:justify-self-center">
            <h1 className="font-bold text-white text-lg lg:text-xl">Customer Service</h1>
            <div className="flex flex-col gap-3 text-white">
              <div className="flex items-center gap-2">
                <RiCustomerService2Fill size={20} />
                <div className="flex flex-col text-base">
                  <h2>+62 123 456 789</h2>
                  <h2>(Monday - Friday, 07:00 - 22:00)</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoMdMail size={20} />
                <div className="flex flex-col text-base">
                  <h2>grocery@gmail.com</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-8 lg:mt-4">
          <div className="service flex flex-col gap-4">
            <h2 className="font-bold text-white text-lg lg:text-xl">Our Delivery Partners</h2>
            <div className="flex flex-row gap-7 lg:gap-10">
              <Image alt="pos" className="w-16 h-12 lg:w-20 lg:h-16" src={pos} />
              <Image alt="tiki" className="w-24 h-12 lg:w-32 lg:h-16" src={tiki} />
              <Image alt="jne" className="w-20 h-12 lg:w-24 lg:h-16" src={jne} />
            </div>
            <div className="flex  flex-wrap gap-4" />
          </div>
          <hr />
        </div>
        <h3 className="text-black text-center font-extralight text-[11px] mt-4">
          Copyright © 2024 Grocery
        </h3>
      </footer>
    </>
  );
};
