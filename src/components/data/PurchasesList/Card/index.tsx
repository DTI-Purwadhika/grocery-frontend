import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import { Order } from "@/constants/entity";

const PurchaseCard = ({ order }: { order: Order }) => {
  return (
    <Card shadow="sm">
      <CardBody className="flex flex-col gap-4 py-4 px-5">
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold">{order.code}</div>
          <Chip
            color={
              order.status === "Dibatalkan"
                ? "danger"
                : order.status === "Pesanan_Dikonfirmasi"
                  ? "primary"
                  : "secondary"
            }
          >
            {order.status.split("_").join(" ")}
          </Chip>
        </div>
        <div className="flex flex-row items-start gap-4">
          <Image
            alt={order.items[0].name + " image"}
            fallbackSrc="https://via.placeholder.com/500x500"
            height={85}
            src={order.items[0].image || ""}
            width={85}
          />
          <div>
            <p className="font-semibold">{order.items[0].name}</p>
            <p className="text-xs">+ {order.items.length} Other Product</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-end">
          <div>
            <p className="text-sm">total belanja </p>
            <p className="text-lg font-semibold">Rp {order.totalAmount}</p>
          </div>
          <Button
            as={Link}
            className="mb-1"
            color="primary"
            href={`/my-profile/my-purchases/${order.code}`}
            size="sm"
            variant="bordered"
          >
            Check Detail
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PurchaseCard;
