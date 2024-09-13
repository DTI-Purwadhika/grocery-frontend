"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Menu } from "lucide-react";

import { Datatabs } from "@/components/data";

const Catalog = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Input className="mb-4 w-5/6" placeholder="Search product" radius="sm" variant="bordered" />
        <Button isIconOnly color="default" variant="light">
          <Menu />
        </Button>
      </div>
      <Datatabs />
    </div>
  );
};

export default Catalog;
