"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";

import { DataSelector, NumberInput } from "@/components/form";

import SearchBar from "../SearchBar";

const Filter = () => {
  return (
    <Card className="mx-2 w-full" shadow="sm">
      <CardBody className="flex flex-col gap-3 p-4">
        <h3 className="font-semibold text-lg">Filter</h3>
        <SearchBar noLabel title="products" />
        <DataSelector isRequired={false} label="Category" source="categories" />
        <Select
          classNames={{
            label: "text-xs",
            value: "text-2xs",
          }}
          label="Sort By"
          labelPlacement="outside"
          placeholder="Sort By..."
          variant="bordered"
        >
          <SelectItem key={"id,ascending"}>Default</SelectItem>
          <SelectItem key={"price,ascending"}>Cheapest</SelectItem>
          <SelectItem key={"price,descending"}>Highest Price</SelectItem>
          <SelectItem key={"name,ascending"}>Alphabetically</SelectItem>
          <SelectItem key={"name,descending"}>Reverse Alphabetically</SelectItem>
        </Select>
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
