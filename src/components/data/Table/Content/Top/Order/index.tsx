import { useMemo } from "react";

import { PageSize, SearchBar } from "@/components/elements";
import { TitleType } from "@/shares/types";

import ColumnSelector from "../ColumnSelector";
import { ColumnType } from "../type";

const OrderContent = ({ title = "data", columns }: TitleType & ColumnType) => {
  const topContent = useMemo(
    () => (
      <div className="grid grid-cols-3 gap-8 items-end">
        <SearchBar title={"order code"} />
        <div className="flex flex-row justify-between">
          <PageSize title={title} />
          <ColumnSelector columns={columns} />
        </div>
      </div>
    ),
    [],
  );

  return topContent;
};

export default OrderContent;
