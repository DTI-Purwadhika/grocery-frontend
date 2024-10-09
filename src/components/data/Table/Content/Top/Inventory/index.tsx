import { useMemo } from "react";

import { DataSelect } from "@/components/elements";
import { PageSize, SearchBar } from "@/components/elements";
import { TitleType } from "@/shares/types";

import ColumnSelector from "../ColumnSelector";
import { ColumnType } from "../type";

const StockContent = ({ title = "data", columns }: TitleType & ColumnType) => {
  const topContent = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-end">
        <SearchBar title={title} />
        <DataSelect source="stores" />
        <div className="flex flex-row justify-between">
          <PageSize />
          <ColumnSelector columns={columns} />
        </div>
      </div>
    ),
    [],
  );

  return topContent;
};

export default StockContent;
