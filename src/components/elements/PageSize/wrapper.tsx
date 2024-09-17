import { Suspense } from "react";
import { Input } from "@nextui-org/input";

import { TitleType } from "@/shares/types";

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

const SizeWrapper = ({ title }: TitleType) => (
  <Suspense fallback={<LoadingInput />}>
    <PageSize title={title} />
  </Suspense>
);

export default SizeWrapper;
