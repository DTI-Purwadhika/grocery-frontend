"use client";
/* eslint-disable */
import { Key, useEffect, useState } from "react";

import { ProductCard } from "@/components/elements";
import restService from "@/services/restService";
import { ProductType } from "@/shares/types/product";

import { BottomContent } from "../../Table/Content";
import { useQuery } from "@/hooks/useQuery";

type TabProps = {
  category: string;
};

const TabContent = ({ category }: TabProps) => {
  const [collectData, setCollectData] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState<Key>("id");
  const [sortDir, setSortDir] = useState<"ascending" | "descending">("ascending");

  const { getQueryParam } = useQuery();

  useEffect(() => {
    fetchData();
  }, [category, getQueryParam("keyword"), page, size, sortBy, sortDir]);

  const fetchData = async () => {
    const endpoint = `products?category=${encodeURIComponent(category)}&keyword=${encodeURIComponent(getQueryParam("keyword")?.toLowerCase() || "")}&page=${page - 1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir?.replace("ending", "")}`;
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
          page={page}
          selectedSize={collectData.length}
          setPage={setPage}
          totalData={totalData}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default TabContent;
