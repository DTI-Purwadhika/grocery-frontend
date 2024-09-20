"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isSelected = theme === "dark";

  const toggleTheme = () => {
    setTheme(isSelected ? "light" : "dark");
  };

  return (
    <Tooltip
      content={isSelected ? "Switch to Light Mode" : "Switch to Dark Mode"}
      placement="bottom"
    >
      <Button isIconOnly color={isSelected ? "secondary" : "primary"} onClick={() => toggleTheme()}>
        {isSelected ? <Moon /> : <Sun />}
      </Button>
    </Tooltip>
  );
};

export default ThemeButton;
