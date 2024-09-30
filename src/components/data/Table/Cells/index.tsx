import { Key } from "react";

import Action from "./Action";
import Card from "./Card";
import Inventory from "./Inventory";

const Cell = (collectData: any, columnKey: Key, title: string) => {
  let renderedCell = collectData[columnKey as keyof any];

  switch (columnKey) {
    case "card":
      renderedCell = <Card row={collectData} title={title} />;
      break;
    case "actions":
      renderedCell = <Action row={collectData} title={title} />;
      break;
    case "inventory":
      renderedCell = <Inventory row={collectData} title={title} />;
      break;
    case "isVerified":
      renderedCell = renderedCell ? "Yes" : "No";
      break;
  }

  return renderedCell;
};

export default Cell;
