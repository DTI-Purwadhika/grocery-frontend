import { Input, InputProps } from "@nextui-org/input";
import { useEffect, useState } from "react";

const NumberInput = ({ value = "", ...fields }: InputProps) => {
  const [size, setSize] = useState<string>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (parseInt(size) < 0) {
        setSize("0");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [size]);

  return (
    <Input
      className="w-full"
      classNames={{
        label: "text-xs",
        input: "text-2xs",
        innerWrapper: "text-xs",
      }}
      labelPlacement="outside"
      min={0}
      type="number"
      value={size}
      variant="bordered"
      onValueChange={setSize}
      {...fields}
    />
  );
};

export default NumberInput;
