"use client";

import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";

import { toCapital } from "@/services/formatter";
import { useParam } from "@/hooks/useParam";
import { TitleType } from "@/shares/types";

const PageSize = ({ title }: TitleType) => {
  const [size, setSize] = useState("10");
  const { setQueryParam, getQueryParam } = useParam();

  useEffect(() => {
    const param = getQueryParam("size") || "10";

    setSize(param);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (parseInt(size) > 0) {
        setQueryParam("size", size);
      } else {
        setSize("1");
        setQueryParam("size", "1");
      }
    }, 675);

    return () => clearTimeout(timeout);
  }, [size]);

  return (
    <Input
      className="w-32"
      label={`${toCapital(title)} per page`}
      labelPlacement="outside-left"
      min={1}
      size="sm"
      type="number"
      value={size}
      variant="underlined"
      onValueChange={setSize}
    />
  );
};

export default PageSize;
