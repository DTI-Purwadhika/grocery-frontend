import type { Metadata } from "next";

import { Providers } from "@/providers/NextUIProviders";
import { ChildType } from "@/shares/types";
import { poppins } from "@/shares/assets/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Repo Starter",
  description: "Start Project",
};

const RootLayout = ({ children }: ChildType) => (
  <html className="light" lang="en">
    <body className={poppins.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
