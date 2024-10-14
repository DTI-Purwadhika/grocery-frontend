import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import { ProductType } from "@/shares/types/product";

const ProductCard = ({ id, name, price, images }: ProductType) => {
  const fontSizeClass = name?.length < 10 ? "text-sm" : name?.length < 25 ? "text-xs" : "text-2xs";
  const productName = name?.length > 50 ? name.slice(0, 50) + "..." : name;

  return (
    <Link passHref href={`/catalog/${id}`}>
      <Card radius="sm" shadow="sm">
        <CardBody className="aspect-[5/6]">
          <Image
            isZoomed
            alt={name + " image"}
            className="object-contain rounded-md aspect-[4/3] w-full"
            fallbackSrc="https://via.placeholder.com/500x500"
            src={images}
            width={500}
          />
          <div className="h-full flex flex-col justify-end ">
            <h3 className={`${fontSizeClass} font-semibold mt-2`}>{productName}</h3>
            <div className="flex flex-row justify-between items-end">
              <span className="text-secondary text-xs">Rp {price},-</span>
              <span className="text-default text-2xs">/100 gram</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
