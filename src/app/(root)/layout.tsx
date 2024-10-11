import { Footer, Header } from "@/components/layout";
import { CartProvider } from "@/providers/CartProviders";
import { ChildType } from "@/shares/types";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import { ShippingProvider } from "@/providers/ShippingProvider";

const RootLayout = async ({ children }: ChildType) => {
  const session = await auth();
  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr_auto] max-w-[99.5vw] overflow-x-hidden">
        <Header />
        <SessionProvider session={session}>
          <CartProvider>
            <ShippingProvider>
              <div className="grid max-h-full lg:grid-cols-[280px_1fr] overflow-auto ">
                <aside className="hidden bg-background p-4 overflow-auto lg:block">Aside</aside>
                <main className="bg-background p-4 max-w-[99.5vw]">{children}</main>
              </div>
              <Footer />
            </ShippingProvider>
          </CartProvider>
        </SessionProvider>
      </div>
    </>
  );
};

export default RootLayout;
