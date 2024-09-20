import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { toCapital } from "@/services/formatter";
import { useParam } from "@/hooks/useParam";

import { ColumnType } from "../type";

const ColumnSelectorCom = ({ columns }: ColumnType) => {
  const { getQueryParam, setQueryParam } = useParam();

  const visibleColumnsString =
    getQueryParam("visibleColumns") || columns.map((col) => col.key).join(",");
  const visibleColumns = new Set(visibleColumnsString.split(","));

  const handleColumnSelectionChange = (keys: "all" | Set<string>) => {
    const newVisibleColumns = Array.from(keys).join(",");

    setQueryParam("visibleColumns", newVisibleColumns);
  };

  const dropdownItem = useMemo(() => {
    return columns.map((column) => (
      <DropdownItem key={column.key} className="capitalize">
        {toCapital(column.label)}
      </DropdownItem>
    ));
  }, [columns]);

  return (
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
        onSelectionChange={(keys) => handleColumnSelectionChange(keys as Set<string>)}
      >
        {dropdownItem}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ColumnSelectorCom;
