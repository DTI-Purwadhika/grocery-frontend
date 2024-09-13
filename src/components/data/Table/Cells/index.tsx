import { Key } from "react";

import Action from "./Action";
import Card from "./Card";
import Inventory from "./Inventory";

const Cell = (collectData: any, columnKey: Key, title: string, fetchData: () => {}) => {
  let renderedCell = collectData[columnKey as keyof any];

  switch (columnKey) {
    case "card":
      renderedCell = <Card cellValue={collectData} />;
      break;
    case "actions":
      renderedCell = <Action fetchData={fetchData} row={collectData} title={title} />;
      break;
    case "inventory":
      renderedCell = <Inventory fetchData={fetchData} row={collectData} title={title} />;
      break;
  }

  return renderedCell;
};

export default Cell;
