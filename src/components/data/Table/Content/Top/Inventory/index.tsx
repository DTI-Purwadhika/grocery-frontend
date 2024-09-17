import { useEffect, useMemo } from "react";

import StoreSelect from "@/components/form/StoreSelect";
import { PageSize, SearchBar } from "@/components/elements";
import { TitleType } from "@/shares/types";
import restService from "@/services/restService";

import ColumnSelector from "../ColumnSelector";
import { ColumnType } from "../type";

const StockContent = ({ title = "data", columns }: TitleType & ColumnType) => {
  useEffect(() => {
    if (title === "inventory") restService("inventory/generate-stock", "POST");
  }, []);

  const topContent = useMemo(
    () => (
      <div className="grid grid-cols-3 gap-8 items-end">
        <SearchBar title={title} />
        <StoreSelect source="stores" />
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

export default StockContent;
