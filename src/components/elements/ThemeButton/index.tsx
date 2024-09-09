import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeButton = () => {
  const [isSelected, setIsSelected] = useState(true);

  const toggleTheme = () => {
    setIsSelected((prevTheme) => !prevTheme);
  };

  return (
    <Tooltip
      content={isSelected ? "Switch to Dark Mode" : "Switch to Light Mode"}
      placement="bottom"
    >
      <Button isIconOnly color={isSelected ? "primary" : "default"} onClick={toggleTheme}>
        {isSelected ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  );
};

export default ThemeButton;
