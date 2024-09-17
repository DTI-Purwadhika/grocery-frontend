"use client";
import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { toCapital } from "@/services/formatter";
import { useQuery } from "@/hooks/useQuery";

import { SearchBarType } from "./type";

const SearchBar = ({ title, noLabel = false }: SearchBarType) => {
  const [keyword, setKeyword] = useState("");
  const { setQueryParam, getQueryParam } = useQuery();

  useEffect(() => {
    const param = getQueryParam("keyword") || "";

    setKeyword(param);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQueryParam("keyword", keyword);
    }, 625);

    return () => clearTimeout(timeout);
  }, [keyword]);

  return (
    <Input
      isClearable
      label={noLabel ? "" : `Search ${title} by name`}
      labelPlacement="outside"
      placeholder={`${toCapital(title)} name...`}
      startContent={<Search className="text-default-300" />}
      value={keyword}
      variant="bordered"
      onClear={() => setKeyword("")}
      onValueChange={(value) => setKeyword(value)}
    />
  );
};

export default SearchBar;
