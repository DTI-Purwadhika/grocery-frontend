import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { toCapital } from "@/services/formatter";
import StoreSelect from "@/components/form/StoreSelect";

import { TopType, ColumnType } from "../type";
import HeaderDropdown from "../HeaderDropdown";

const StockContent = ({
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
        <h2 className="text-2xl font-semibold text-default-900 mb-4">{toCapital(title)}</h2>
        <div className="grid grid-cols-3 gap-8 items-end">
          <Input
            isClearable
            label={`Search ${title} by product name`}
            labelPlacement="outside"
            placeholder={`Product name...`}
            startContent={<Search className="text-default-300" />}
            value={keyword}
            variant="bordered"
            onClear={() => setKeyword("")}
            onValueChange={setKeyword}
          />
          <StoreSelect source="stores" />
          <div className="flex flex-row justify-between">
            <Input
              className="w-28 "
              label={`${toCapital(title)} per page`}
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
          </div>
        </div>
      </div>
    ),
    [keyword, size, visibleColumns],
  );

  return topContent;
};

export default StockContent;
