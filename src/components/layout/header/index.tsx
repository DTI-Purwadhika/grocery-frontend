import { Notification } from "@/components/elements";

import { BackButton, TitleApp } from "./service";

const Header = () => {
  return (
    <header className="bg-background w-full flex flex-row justify-between items-center p-4">
      <BackButton />
      <TitleApp />
      <Notification />
    </header>
  );
};

export default Header;
