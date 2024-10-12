"use client";
import { useQuery } from "@tanstack/react-query";
import { Key } from "react";

import { useParam } from "@/hooks/useParam";
import { fetchData } from "@/services/dataService";
import { Loading } from "@/components/elements";
import { Order } from "@/constants/entity";

import { BottomContent } from "../Table/Content";

import PurchaseCard from "./Card";

const PurchasesList = () => {
  const { getQueryParam } = useParam();

  const keyword = getQueryParam("keyword") || "";
  const page = Number(getQueryParam("page")) || 1;
  const size = Number(getQueryParam("size")) || 10;
  const sortBy: Key = "id";
  const sortDir: "ascending" | "descending" = "ascending";

  const { data, isLoading } = useQuery({
    queryKey: [`checkouts`, keyword, page, size, sortBy, sortDir, "", ""],
    queryFn: fetchData,
    staleTime: 0,
  });

  if (isLoading) {
    return <Loading title="Purchase List" />;
  }

  return (
    <div className="mx-2 flex flex-col gap-4">
      {data?.content.map((order: Order) => <PurchaseCard key={order.id} order={order} />)}
      <BottomContent
        notMultiple
        selectedSize={data?.content.length}
        totalData={data?.totalData}
        totalPages={data?.totalPage}
      />
    </div>
  );
};

export default PurchasesList;
