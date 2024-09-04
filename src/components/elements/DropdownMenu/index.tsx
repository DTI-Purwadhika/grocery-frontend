import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu as NextUIDropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { DropdownMenuType } from "./type";

export const DropdownMenu = ({ triggerIcon, options }: DropdownMenuType) => (
  <Dropdown>
    <DropdownTrigger>
      <Button isIconOnly size={"sm"} variant={"light"}>
        {triggerIcon}
      </Button>
    </DropdownTrigger>
    <NextUIDropdownMenu>
      {options.map((option, index) => (
        <DropdownItem key={index}>{option}</DropdownItem>
      ))}
    </NextUIDropdownMenu>
  </Dropdown>
);
