import { ChildType } from "@/shares/types";
import { DashboardHeader, Sidebar } from "@/components/layout";

const RootLayout = ({ children }: ChildType) => (
  <div className="grid h-screen grid-rows-[1fr_10fr_1fr]">
    <header className="bg-background pt-4 pb-2 lg:px-4">
      <DashboardHeader />
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
