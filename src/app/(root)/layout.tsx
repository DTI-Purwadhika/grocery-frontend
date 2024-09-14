import { Footer, Header } from "@/components/layout";
import { ChildType } from "@/shares/types";

const RootLayout = ({ children }: ChildType) => (
  <div className="grid h-screen grid-rows-[auto_1fr_auto] max-w-[99.5vw] overflow-x-hidden">
    <Header />
    <div className="grid max-h-full lg:grid-cols-[280px_1fr] overflow-auto ">
      <aside className="hidden bg-background p-4 overflow-auto lg:block">Aside</aside>
      <main className="bg-background p-4 max-w-[99.5vw]">{children}</main>
    </div>
    <Footer />
  </div>
);

export default RootLayout;
