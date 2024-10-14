import { Footer, Header } from "@/components/layout";
import { CartProvider } from "@/providers/CartProviders";
import { ChildType } from "@/shares/types";
import { ShippingProvider } from "@/providers/ShippingProvider";
import SideBar from "@/components/layout/sidebar-web";

const RootLayout = ({ children }: ChildType) => (
  <CartProvider>
    <div className="grid h-screen grid-rows-[auto_1fr_auto] max-w-screen overflow-x-hidden">
      <Header />
      <ShippingProvider>
        <div className="grid max-h-full max-w-screen lg:grid-cols-[20vw_80vw] overflow-x-hidden bg-background">
          <SideBar />
          <main className="bg-background p-4 lg:pr-8 max-w-[99.5vw] lg:max-w-full">{children}</main>
        </div>
      </ShippingProvider>
      <Footer />
    </div>
  </CartProvider>
);

export default RootLayout;
