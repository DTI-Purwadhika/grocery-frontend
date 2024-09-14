"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Heart, ShoppingCart } from "lucide-react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { toCapital } from "@/services/formatter";
import { Product } from "@/constants/entity";
import restService from "@/services/restService";

import { ProductDetailType } from "./type";

const ProductDetail = ({ id }: ProductDetailType) => {
  const [collectData, setCollectData] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const endpoint = `products/${id}`;
    const { resultData } = await restService(endpoint);

    setCollectData(resultData);
    setIsLoading(false);
  };

  return (
    <div className="grid gap-4 grid-rows-[1fr_auto] h-full overflow-hidden">
      {isLoading && <div>Loading...</div>}
      <ScrollShadow className="h-full">
        <Image alt={collectData?.images[0].altText} src={collectData?.images[0].url} />
        <div className="flex flex-row justify-between text-xl font-bold items-start mt-4">
          <h1>{toCapital(collectData?.name || "")}</h1>
          <Heart />
        </div>
        <p className="text-2xs">{collectData?.category}</p>
        <br />
        <div className="flex flex-row justify-between items-center">
          <p className="text-secondary font-semibold text-lg">Rp {collectData?.price},-</p>
          <ButtonGroup isIconOnly color="primary" radius="full" size="sm">
            <Button>-</Button>
            <Button>1</Button>
            <Button>+</Button>
          </ButtonGroup>
        </div>
        <br />
        <div className="mb-4">
          <h3 className="text-sm font-semibold my-2">About the product</h3>
          <p className="text-xs">{collectData?.description}</p>
        </div>
      </ScrollShadow>
      <Button className="w-full opacity-90 hover:opacity-100" color="primary" radius="sm" size="lg">
        <ShoppingCart /> Add to cart
      </Button>
    </div>
  );
};

export default ProductDetail;
