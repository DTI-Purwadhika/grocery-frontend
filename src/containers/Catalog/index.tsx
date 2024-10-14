import React from "react";

import { Datatabs } from "@/components/data";
import { SearchBar } from "@/components/elements";

const Catalog = () => (
  <div className="w-full">
    <SearchBar noLabel title="products" />
    {/* <Button isIconOnly color="default" variant="light">
        <Menu />
      </Button> */}
    <Datatabs />
  </div>
);

export default Catalog;
