"use client";
import { Check, Copy } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { fetchById } from "@/services/dataService";
import { Order } from "@/constants/entity";
import { Loading } from "@/components/elements";
import restService from "@/services/restService";

import ProductCard from "./Card";

const PurchaseDetail = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["checkouts", id],
    queryFn: () => fetchById("checkouts", id!),
    enabled: true,
  });

  const updateMutation = useMutation({
    mutationFn: () => restService(`checkouts/${(data as Order).id}?status=confirm`, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkouts"] });
      toast.success(`Invoice of ${id} has been updated`);
    },
    onError: () => {
      toast.error(`Failed to update ${id}`);
    },
  });

  const handlePurchase = () => {
    updateMutation.mutate();
  };

  if (isLoading) {
    return <Loading title={`${id} Detail`} />;
  }

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex flex-col gap-2 text-sm">
        <div className="font-semibold text-medium">
          {(data as Order).status.split("_").join(" ")}
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
      <Button
        color="primary"
        isDisabled={(data as Order).status !== "Dikirim"}
        onClick={() => handlePurchase()}
      >
        <Check /> Confirm Purchase
      </Button>
    </div>
  );
};

export default PurchaseDetail;
