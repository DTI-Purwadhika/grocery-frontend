import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import { SearchBarType } from "./type";

import SearchBar from ".";

const LoadingInput = () => (
  <Input
    disabled
    label="Loading search bar..."
    labelPlacement="outside"
    placeholder="Loading..."
    variant="bordered"
  />
);

const SearchWrapper = ({ title, noLabel = false }: SearchBarType) => (
  <Suspense fallback={<LoadingInput />}>
    <SearchBar noLabel={noLabel} title={title} />
  </Suspense>
);

export default SearchWrapper;
