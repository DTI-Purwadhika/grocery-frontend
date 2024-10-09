"use client";

import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";

import { useParam } from "@/hooks/useParam";

const PageSize = () => {
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
      className="w-32 hidden md:flex"
      classNames={{
        label: "text-2xs",
      }}
      label={`Data per page`}
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
