import Link from "next/link";

import { ChildType } from "@/shares/types";

const RootLayout = ({ children }: ChildType) => (
  <div className="grid h-screen grid-rows-[1fr_10fr_1fr] text-black">
    <header className="bg-background  px-8 py-4" />
    <div className="grid max-h-full w-full lg:grid-cols-[250px_1fr]">
      <aside className="bg-background hidden py-4 px-8 lg:block overflow-auto">
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/dashboard/products">Products</Link>
          <Link href="/dashboard/categories">Categories</Link>
          <Link href="/dashboard/inventories">Inventory</Link>
        </div>
      </aside>
      <main className="bg-background py-4 px-8 overflow-auto">{children}</main>
    </div>
    <footer className="px-8 py-4">Footer</footer>
  </div>
);

export default RootLayout;
