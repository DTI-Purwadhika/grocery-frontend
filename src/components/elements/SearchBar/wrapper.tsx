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
    <div className="hidden md:block">
      <SearchBar noLabel={noLabel} title={title} />
    </div>
    <div className="block md:hidden">
      <SearchBar noLabel={true} title={title} />
    </div>
  </Suspense>
);

export default SearchWrapper;
