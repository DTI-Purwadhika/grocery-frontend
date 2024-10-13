import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import SortBy from ".";

const LoadingInput = () => (
  <Input
    disabled
    label="Loading sort bar..."
    labelPlacement="outside"
    placeholder="Loading..."
    variant="bordered"
  />
);

const SearchWrapper = () => (
  <Suspense fallback={<LoadingInput />}>
    <SortBy />
  </Suspense>
);

export default SearchWrapper;
