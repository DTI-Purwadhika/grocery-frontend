import { useMemo } from "react";

import { PageSize, SearchBar } from "@/components/elements";

import ColumnSelector from "../ColumnSelector";
import { ColumnType } from "../type";

const OrderContent = ({ columns }: ColumnType) => {
  const topContent = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-end">
        <SearchBar title={"order code"} />
        <div className="flex flex-row justify-end gap-4">
          <PageSize />
          <ColumnSelector columns={columns} />
        </div>
      </div>
    ),
    [],
  );

  return topContent;
};

export default OrderContent;
