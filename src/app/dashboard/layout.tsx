import { Apple } from "lucide-react";

import { ChildType } from "@/shares/types";
import UserCard from "@/components/elements/User";
import { Sidebar } from "@/components/layout";

const RootLayout = ({ children }: ChildType) => (
  <div className="grid h-screen grid-rows-[1fr_10fr_1fr]">
    <header className="bg-background px-4 md:pl-7 lg:px-8 pt-4 pb-2 flex justify-between">
      <span className="font-bold text-green-600 text-2xl lg:ml-6 flex flex-row gap-2 items-center">
        <Apple /> Grocery App
      </span>
      <UserCard />
    </header>
    <div className="grid max-h-full w-full lg:grid-cols-[280px_1fr]">
      <aside className="bg-background hidden h-screen py-4 pl-8 pr-4 lg:block overflow-auto sticky top-0">
        <Sidebar />
      </aside>
      <main className="bg-background p-4 lg:pr-8 overflow-auto">{children}</main>
    </div>
    <footer className="px-8 py-4" />
  </div>
);

export default RootLayout;
