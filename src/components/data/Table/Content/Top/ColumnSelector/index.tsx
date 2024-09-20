import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import { ColumnType } from "../type";

import ColumnSelectorCom from "./components";

const LoadingInput = () => (
  <Input
    disabled
    label="Loading..."
    labelPlacement="outside-left"
    placeholder="Loading..."
    variant="bordered"
  />
);

const ColumnSelector = ({ columns }: ColumnType) => (
  <Suspense fallback={<LoadingInput />}>
    <ColumnSelectorCom columns={columns} />
  </Suspense>
);

export default ColumnSelector;
