import { ChildType } from "@/shares/types";

const RootLayout = ({ children }: ChildType) => (
  <div className="grid h-screen grid-rows-[1fr_10fr_1fr]">
    <header className="bg-slate-500 px-8 py-4">Header</header>
    <div className="grid max-h-full w-full lg:grid-cols-[250px_1fr]">
      <aside className="bg-green-400 hidden py-4 px-8 lg:block overflow-auto">Sidebar</aside>
      <main className="bg-background py-4 px-8 overflow-auto">{children}</main>
    </div>
    <footer className="bg-blue-400 px-8 py-4">Footer</footer>
  </div>
);

export default RootLayout;
