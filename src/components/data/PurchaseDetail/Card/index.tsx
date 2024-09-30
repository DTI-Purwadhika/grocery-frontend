import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Redo, ShoppingCart } from "lucide-react";
const ProductCard = () => {
  return (
    <Card shadow="sm">
      <CardBody className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-start gap-4">
          <Image
            alt="hehe"
            fallbackSrc="https://via.placeholder.com/500x500"
            height={85}
            src={"hehe"}
            width={85}
          />
          <div>
            <p className="font-semibold">Product super GG Brutal</p>
            <p className="text-sm">1 x Rp 90000,-</p>
          </div>
        </div>
        <hr className="my-1" />
        <div className="flex flex-row w-full justify-between items-end">
          <div>
            <p className="text-xs">Total Harga</p>
            <p className="font-semibold">Rp 25000</p>
          </div>
          <div className="flex flex-row gap-2">
            <Button isIconOnly color="default" size="sm" variant="bordered">
              <Redo />
            </Button>
            <Button color="primary" size="sm">
              <ShoppingCart /> Buy Again
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
