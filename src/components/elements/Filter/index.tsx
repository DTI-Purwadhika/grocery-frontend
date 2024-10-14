"use client";
import { Card, CardBody } from "@nextui-org/card";

import { DataSelector, NumberInput } from "@/components/form";

import SearchBar from "../SearchBar";
import SortBy from "../SortBy/wrapper";

const Filter = () => {
  return (
    <Card className="mx-2 w-full" shadow="sm">
      <CardBody className="flex flex-col gap-3 p-4">
        <h3 className="font-semibold text-lg">Filter</h3>
        <SearchBar noLabel title="products" />
        <DataSelector isRequired={false} label="Category" source="categories" />
        <SortBy />
        <NumberInput
          endContent=",-"
          label="Min Price"
          labelPlacement="outside"
          placeholder="0..."
          startContent="Rp"
        />
        <NumberInput
          endContent=",-"
          label="Max Price"
          labelPlacement="outside"
          placeholder="100000000..."
          startContent="Rp"
        />
      </CardBody>
    </Card>
  );
};

export default Filter;
