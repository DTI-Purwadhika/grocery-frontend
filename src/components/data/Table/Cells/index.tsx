import { Key } from "react";

import Action from "./Action";
import Card from "./Card";

const Cell = (title = "data", columnKey: Key, cellValue: any) => {
  let renderedCell = cellValue;

  switch (columnKey) {
    case "card":
      renderedCell = <Card cellValue={cellValue} />;
      break;
    case "actions":
      renderedCell = <Action title={title} />;
      break;
  }

  return renderedCell;
};

export default Cell;
