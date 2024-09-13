import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { ProductType } from "@/shares/types/product";

const ProductCard = ({ name, price, images }: ProductType) => {
  const fontSizeClass = name?.length < 25 ? "text-xs" : "text-2xs";
  const productName = name?.length > 50 ? name.slice(0, 50) + "..." : name;

  return (
    <Card radius="sm" shadow="sm">
      <CardBody className="aspect-[5/6]">
        <Image alt={name + " image"} className="object-cover rounded-md" src={images} width={270} />
        <div className="h-full flex flex-col justify-between">
          <h3 className={`${fontSizeClass} font-semibold mt-2`}>{productName}</h3>
          <div className="flex flex-row justify-between items-end">
            <span className="text-secondary text-xs">Rp {price},-</span>
            <span className="text-default text-2xs">/gram</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
