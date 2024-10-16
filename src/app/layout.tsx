import type { Metadata } from "next";

import React from "react";
import { SessionProvider } from "next-auth/react";

import { Providers } from "@/providers";
import { ChildType } from "@/shares/types";
import { poppins } from "@/shares/assets/fonts";
import { LocationProvider } from "@/providers/LocationProvider";

import { auth } from "../../auth";

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
            <LocationProvider>{children}</LocationProvider>
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
