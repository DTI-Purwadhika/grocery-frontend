import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import PageSize from ".";

const LoadingInput = () => (
  <Input
    disabled
    label="Loading..."
    labelPlacement="outside-left"
    placeholder="Loading..."
    variant="bordered"
  />
);

const SizeWrapper = () => (
  <Suspense fallback={<LoadingInput />}>
    <PageSize />
  </Suspense>
);

export default SizeWrapper;
