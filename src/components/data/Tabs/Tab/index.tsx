"use client";
/* eslint-disable */
import { Key, useEffect, useState } from "react";

import { ProductCard } from "@/components/elements";
import restService from "@/services/restService";
import { ProductType } from "@/shares/types/product";

import { BottomContent } from "../../Table/Content";
import { useQuery } from "@/hooks/useQuery";
import { TabType } from "./type";

const TabContent = ({ category }: TabType) => {
  const [collectData, setCollectData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState<Key>("id");
  const [sortDir, setSortDir] = useState<"ascending" | "descending">("ascending");

  const { getQueryParam } = useQuery();

  const keyword = getQueryParam("keyword");
  const page = Number(getQueryParam("page")) || 1;

  useEffect(() => {
    fetchData();
  }, [category, keyword, page, size, sortBy, sortDir]);

  const fetchData = async () => {
    const endpoint = `products?category=${encodeURIComponent(category)}&keyword=${encodeURIComponent(keyword?.toLowerCase() || "")}&page=${page - 1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir?.replace("ending", "")}`;
    const { content, totalData, totalPage } = await restService(endpoint);

    setCollectData(content);
    setTotalData(totalData);
    setTotalPages(totalPage);
    setIsLoading(false);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
        {collectData?.map((data) => <ProductCard key={data.id} {...data} />)}
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
