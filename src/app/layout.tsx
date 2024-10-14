import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { Providers } from "@/providers";
import { ChildType } from "@/shares/types";
import { poppins } from "@/shares/assets/fonts";

import { auth } from "../../auth";
import React from "react";

import { CartProvider } from "@/providers/CartProviders";
import { LocationProvider } from "@/providers/LocationProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Grocery APP",
  description: "All of everything you need to manage your groceries",
};

const RootLayout = async ({ children }: ChildType) => {
  const session = await auth();

  return (
    <html className="text-foreground light" lang="en">
      <SessionProvider session={session}>
        <body className={poppins.className}>
          <Providers>
            <LocationProvider>
              <CartProvider> {children}</CartProvider>
            </LocationProvider>
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
