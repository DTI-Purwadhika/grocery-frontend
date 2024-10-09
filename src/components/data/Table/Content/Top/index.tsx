import { useMemo } from "react";

import { toCapital } from "@/services/formatter";
import { TitleType } from "@/shares/types";

import { ColumnType } from "./type";
import StockContent from "./Inventory";
import DefaultContent from "./Default";
import OrderContent from "./Order";

const TopContent = ({ title = "data", columns }: TitleType & ColumnType) => {
  const topContent = useMemo(
    () => (
      <div className="mb-2 ">
        <h2 className="text-2xl font-semibold text-default-900 mb-4">{toCapital(title)}</h2>
        {title === "inventory" ? (
          <StockContent columns={columns} title={title} />
        ) : title === "checkouts" ? (
          <OrderContent columns={columns} />
        ) : (
          <DefaultContent columns={columns} title={title} />
        )}
      </div>
    ),
    [],
  );

  return topContent;
};

export default TopContent;
