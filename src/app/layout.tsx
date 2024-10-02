import type { Metadata } from "next";

import { Providers } from "@/providers";
import { ChildType } from "@/shares/types";
import { poppins } from "@/shares/assets/fonts";
import "@/styles/globals.css";
import { auth } from "../../auth";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/providers/CartProviders";

export const metadata: Metadata = {
  title: "Repo Starter",
  description: "Start Project",
};

const RootLayout = async ({ children }: ChildType) => {
  const session = await auth();

  return (
    <html className="text-foreground light" lang="en">
      <SessionProvider session={session}>
        <body className={poppins.className}>
          <Providers>
            <CartProvider> {children}</CartProvider>
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
