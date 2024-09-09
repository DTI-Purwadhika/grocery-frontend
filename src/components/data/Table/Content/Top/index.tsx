import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@nextui-org/link";

import { useCapitalize } from "@/hooks/formatter";

import { TopType, ColumnType } from "./type";
import HeaderDropdown from "./HeaderDropdown";

const TopContent = ({
  title = "data",
  onSearch,
  onSize,
  visibleColumns,
  setVisibleColumns,
  columns,
}: TopType & ColumnType) => {
  const [keyword, setKeyword] = useState<string>("");
  const [size, setSize] = useState<string>("10");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(keyword);
      if (parseInt(size) > 0) {
        onSize(parseInt(size));
      } else {
        setSize("1");
        onSize(1);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, size]);

  const topContent = useMemo(
    () => (
      <div>
        <h2 className="text-2xl font-semibold text-default-900 mb-4">{useCapitalize(title)}</h2>
        <div className="grid grid-cols-2 gap-8 items-end">
          <Input
            isClearable
            label={`Search ${title} by name`}
            labelPlacement="outside"
            placeholder={`${useCapitalize(title)} name...`}
            startContent={<Search className="text-default-300" />}
            value={keyword}
            variant="bordered"
            onClear={() => setKeyword("")}
            onValueChange={setKeyword}
          />
          <div className="flex flex-row justify-end gap-4">
            <Input
              className="w-28 "
              label={`${useCapitalize(title)} per page`}
              labelPlacement="outside-left"
              min={1}
              size="sm"
              type="number"
              value={size}
              variant="underlined"
              onValueChange={setSize}
            />
            <HeaderDropdown
              columns={columns}
              setVisibleColumns={setVisibleColumns}
              visibleColumns={visibleColumns}
            />
            <Button
              as={Link}
              className="bg-primary text-background"
              endContent={<Plus />}
              href={`${title}/create`}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    ),
    [keyword, size, visibleColumns],
  );

  return topContent;
};

export default TopContent;
