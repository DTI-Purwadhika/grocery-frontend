import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { ChevronDown } from "lucide-react";

import { toCapital } from "@/services/formatter";

import { ColumnType } from "./type";

const HeaderDropdown = ({ visibleColumns, setVisibleColumns, columns }: ColumnType) => (
  <Dropdown>
    <DropdownTrigger className="hidden sm:flex">
      <Button endContent={<ChevronDown className="text-small" />} variant="flat">
        Columns
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      disallowEmptySelection
      aria-label="Table Columns"
      closeOnSelect={false}
      selectedKeys={visibleColumns}
      selectionMode="multiple"
      onSelectionChange={(keys) => setVisibleColumns(new Set(Array.from(keys) as string[]))}
    >
      {columns.map((column) => (
        <DropdownItem key={column.key} className="capitalize">
          {toCapital(column.label)}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export default HeaderDropdown;
