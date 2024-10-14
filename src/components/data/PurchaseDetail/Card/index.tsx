import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { OrderDetail } from "@/constants/entity";

const ProductCard = ({ item }: { item: OrderDetail }) => {
  return (
    <Card shadow="sm">
      <CardBody className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-start gap-4">
          <Image
            alt={item.name + " image"}
            className="object-cover"
            fallbackSrc="https://via.placeholder.com/500x500"
            height={85}
            src={item.image || ""}
            width={85}
          />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm">
              {item.quantity} x Rp {item.price},-
            </p>
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex flex-row w-full justify-between items-end">
          <div>
            <p className="text-xs">Total Harga</p>
            <p className="font-semibold">Rp {item.totalPrice},-</p>
          </div>
          <div className="flex flex-row gap-2">
            <Button as={Link} color="primary" href={`/catalog/${item.id}`} size="sm">
              <ShoppingCart /> Buy Again
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
