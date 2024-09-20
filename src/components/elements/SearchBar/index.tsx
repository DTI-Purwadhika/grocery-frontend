"use client";
import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { toCapital } from "@/services/formatter";
import { useParam } from "@/hooks/useParam";

import { SearchBarType } from "./type";

const SearchBar = ({ title, noLabel = false }: SearchBarType) => {
  const [keyword, setKeyword] = useState("");
  const [isChange, setIsChange] = useState(false);
  const isFirstRender = useRef(true);

  const { setQueryParam, getQueryParam } = useParam();

  useEffect(() => {
    const param = getQueryParam("keyword") || "";

    setKeyword(param);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    const timeout = setTimeout(() => {
      if (isChange) setQueryParam("keyword", keyword);
      setIsChange(false);
    }, 625);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const handleChange = (value: string) => {
    setIsChange(true);
    setKeyword(value);
  };

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
      onValueChange={(value) => handleChange(value)}
    />
  );
};

export default SearchBar;
