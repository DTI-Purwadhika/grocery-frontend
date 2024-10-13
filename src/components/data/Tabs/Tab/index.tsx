"use client";
import { Key } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Loading, ProductCard } from "@/components/elements";
import { ProductType } from "@/shares/types/product";
import { useParam } from "@/hooks/useParam";
import { fetchData } from "@/services/dataService";

import { BottomContent } from "../../Table/Content";

import { TabType } from "./type";

const TabContent = ({ category }: TabType) => {
  const { getQueryParam, setQueryParam } = useParam();

  const keyword = getQueryParam("keyword") || "";
  const page = Number(getQueryParam("page")) || 1;
  const size = Number(getQueryParam("size")) || 10;
  const sortBy: Key = "id";
  const sortDir: "ascending" | "descending" = "ascending";

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      `products`,
      keyword,
      page,
      size,
      sortBy,
      sortDir,
      category === "All Category" ? "" : category,
      "",
    ],
    queryFn: fetchData,
    staleTime: 0,
  });

  if (isLoading) {
    return <Loading title="Product" />;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const {
    content: collectData,
    totalData,
    totalPage: totalPages,
  } = data || {
    content: [],
    totalData: 0,
    totalPage: 0,
  };

  if (page > totalPages) {
    setQueryParam("page", "1");
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 ">
        {collectData?.map((data: ProductType) => <ProductCard key={data.id} {...data} />)}
      </div>
      <div className={`${totalPages > 1 ? "block" : "hidden"} my-8 w-full`}>
        <BottomContent
          notMultiple
          selectedSize={collectData.length}
          totalData={totalData}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default TabContent;
