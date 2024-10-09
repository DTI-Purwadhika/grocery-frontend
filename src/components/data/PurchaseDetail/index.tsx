"use client";
import { Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchById } from "@/services/dataService";
import { Order } from "@/constants/entity";
import { Loading } from "@/components/elements";

import ProductCard from "./Card";

const PurchaseDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["checkouts", id],
    queryFn: () => fetchById("checkouts", id!),
    enabled: true,
  });

  if (isLoading) {
    return <Loading title={`${id} Detail`} />;
  }

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex flex-col gap-2 text-sm">
        <div className="font-semibold text-medium">
          Pesanan {(data as Order).status.split("_").join(" ")}
        </div>
        <hr />
        <div className="flex flex-row gap-2 items-center">
          <span>{(data as Order).code}</span>
          <Copy size={16} />
        </div>
        <div className="flex flex-row justify-between">
          <div>Purchase Date</div>
          <div>{(data as Order).createdAt}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Purchased Products</h3>
        <div className="flex flex-col gap-4">
          {(data as Order).items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
