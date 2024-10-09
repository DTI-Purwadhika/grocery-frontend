import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import { SelectorType } from "./type";

import StoreSelect from ".";

const LoadingInput = ({ source }: SelectorType) => (
  <Input
    disabled
    label="Loading ..."
    labelPlacement="outside"
    placeholder={`Loading your ${source}...`}
    variant="bordered"
  />
);

const StoreSelectWrapper = ({ source = "" }: SelectorType) => (
  <Suspense fallback={<LoadingInput source={source} />}>
    <div className="hidden md:flex">
      <StoreSelect source={source} />
    </div>
    <div className="md:hidden">
      <StoreSelect noLabel={true} source={source} />
    </div>
  </Suspense>
);

export default StoreSelectWrapper;
