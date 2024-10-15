"use client";
import { Check, Copy, CreditCard } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import Link from "next/link";

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

  const order = data as Order;

  const updateMutation = useMutation({
    mutationFn: () => restService(`checkouts/${order.id}?status=confirm`, "PUT"),
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
        <div className="font-semibold text-medium">{order.status.split("_").join(" ")}</div>
        <hr />
        <div className="flex flex-row gap-2 items-center">
          <span>{order.code}</span>
          <Copy size={16} />
        </div>
        <div className="flex flex-row justify-between">
          <div>Purchase Date</div>
          <div>{order.createdAt}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Purchased Products</h3>
        <div className="flex flex-col gap-4">
          {order.items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Button
        as={Link}
        className={order.status.toLowerCase() !== "menunggu_pembayaran" ? "hidden" : "flex"}
        color="primary"
        href={order.invoiceUrl}
        isDisabled={order.status.toLowerCase() !== "menunggu_pembayaran"}
        onClick={() => handlePurchase()}
      >
        <CreditCard /> Continue the payment
      </Button>
      <Button
        className={order.status.toLowerCase() !== "dikirim" ? "hidden" : "flex"}
        color="primary"
        isDisabled={order.status.toLowerCase() !== "dikirim"}
        onClick={() => handlePurchase()}
      >
        <Check /> Confirm Purchase
      </Button>
    </div>
  );
};

export default PurchaseDetail;
