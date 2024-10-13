import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@nextui-org/button";

import { Datatabs } from "@/components/data";
import { SearchBar } from "@/components/elements";

const Catalog = () => (
  <div className="w-full">
    <div className="flex flex-row justify-between items-end mb-2 gap-2 lg:hidden">
      <SearchBar noLabel title="products" />
      <Button isIconOnly color="default" variant="light">
        <Menu />
      </Button>
    </div>
    <Datatabs />
  </div>
);

export default Catalog;
