"use client";
import { useEffect, useRef, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

import { useParam } from "@/hooks/useParam";

const SortBy = () => {
  const [keyword, setKeyword] = useState("id,ascending");
  const [isChange, setIsChange] = useState(false);
  const isFirstRender = useRef(true);

  const { setQueryParam, getQueryParam } = useParam();

  useEffect(() => {
    const param = getQueryParam("sort") || "";

    setKeyword(param);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    const timeout = setTimeout(() => {
      if (isChange) setQueryParam("sort", keyword);
      setIsChange(false);
    }, 625);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const handleChange = (value: string) => {
    setIsChange(true);
    setKeyword(value);
  };

  return (
    <Select
      classNames={{
        label: "text-xs",
        value: "text-2xs",
      }}
      defaultSelectedKeys={[keyword]}
      label="Sort By"
      labelPlacement="outside"
      placeholder="Sort By..."
      variant="bordered"
      onSelectionChange={(value) => handleChange(value as string)}
    >
      <SelectItem key={"id,ascending"}>Earliest</SelectItem>
      <SelectItem key={"id,descending"}>Latest</SelectItem>
      <SelectItem key={"price,ascending"}>Cheapest</SelectItem>
      <SelectItem key={"price,descending"}>Highest Price</SelectItem>
      <SelectItem key={"name,ascending"}>Alphabetically</SelectItem>
      <SelectItem key={"name,descending"}>Reverse Alphabetically</SelectItem>
    </Select>
  );
};

export default SortBy;
