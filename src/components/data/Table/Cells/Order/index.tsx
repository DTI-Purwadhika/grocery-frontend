import { Tooltip } from "@nextui-org/tooltip";
import { PackageCheck, PackageSearch, PackageX, Truck } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";

import restService from "@/services/restService";
import StockAlert from "@/components/elements/Alert/StockAlert";
import { Order } from "@/constants/entity";
import { TitleType } from "@/shares/types";

const OrderCell = ({ title, row }: { row: Order } & TitleType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(row.status);
  const [resi, setResi] = useState("");
  // const [update, setUpdate] = useState("");
  const queryClient = useQueryClient();

  const updateContent = (
    <div className="flex flex-col gap-4 w-full items-center lg:grid lg:grid-cols-2">
      <Image
        alt={row?.code + " payment proof"}
        className="w-full aspect-square object-cover mx-auto"
        src={row?.proofUrl}
      />
      <div className="flex flex-col gap-4">
        <Button
          color="danger"
          isDisabled={status !== "Menunggu_Konfirmasi_Pembayaran"}
          onClick={() => handleUpdate("reject")}
        >
          <PackageX /> Reject Payment
        </Button>
        <Button
          color="secondary"
          isDisabled={status !== "Menunggu_Konfirmasi_Pembayaran"}
          onClick={() => handleUpdate("confirm_payment")}
        >
          <PackageCheck /> Process Order
        </Button>
        <Input
          isDisabled={status !== "confirm_payment" && status !== "Diproses"}
          placeholder="No Resi..."
          radius="sm"
          variant="bordered"
          onChange={(e) => setResi(e.target.value)}
        />
        <Button
          color="primary"
          isDisabled={(status !== "confirm_payment" && status !== "Diproses") || resi === ""}
          onClick={() => handleUpdate("deliver")}
        >
          <Truck /> Send Order
        </Button>
      </div>
    </div>
  );

  const updateMutation = useMutation({
    mutationFn: () => restService(`${title}/${row.id}?status=${status}&update=${resi}`, "PUT"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [title] });
      toast.success(`Invoice of ${row.code} has been updated`);
    },
    onError: () => {
      toast.error(`Failed to update ${row.code}`);
    },
  });

  const handleUpdate = (value: string) => {
    setStatus(value);
    updateMutation.mutate();
    onClose();
  };

  const openUpdate = () => {
    onOpen();
  };

  return (
    <div
      className={`flex flex-row justify-end ${row.status === "Pesanan_Dikonfirmasi" || row.status === "Dibatalkan" || row.status === "Dikirim" ? "hidden" : ""}`}
    >
      <Tooltip content={`Update ${row.code}`}>
        <Button isIconOnly color="primary" variant="light" onClick={openUpdate}>
          <PackageSearch className="text-primary-400 cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <StockAlert
        isOpen={isOpen}
        purpose={"update"}
        title={`Update order status of ${row.code}`}
        onClose={onClose}
        onConfirm={onClose}
      >
        {updateContent}
      </StockAlert>
    </div>
  );
};

export default OrderCell;
