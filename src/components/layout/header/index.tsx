import { MoveLeft } from "lucide-react";

import { Notification } from "@/components/elements";

const Header = () => {
  return (
    <header className="bg-background w-full flex flex-row justify-between items-center p-4">
      <MoveLeft />
      <h1 className="text-2xl font-semibold">Fruits</h1>
      <Notification />
    </header>
  );
};

export default Header;
