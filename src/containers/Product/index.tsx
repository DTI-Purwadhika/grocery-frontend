"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useDisclosure } from "@nextui-org/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toCapital } from "@/services/formatter";
import { Product } from "@/constants/entity";
import restService from "@/services/restService";
import { useCart } from "@/providers/CartProviders";
import StockList from "@/components/elements/Alert/StockList";
import { Loading } from "@/components/elements";
import { CartItem } from "@/providers/CartProviders/type";

import { ProductDetailType } from "./type";

const ProductDetail = ({ id }: ProductDetailType) => {
  const [collectData, setCollectData] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { addItemToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const userEmail = session?.user?.email || "1";

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const endpoint = `products/${id}`;
    const { resultData } = await restService(endpoint);
    let totalStock = 0;

    setCollectData(resultData);
    (resultData as Product)?.stocks?.map((store) => (totalStock += store.stock));
    setAvailableStock(totalStock);
    setIsLoading(false);
  };

  const handleQuantity = (value: number) => {
    if (value === 0) return;
    setQuantity(value);
  };

  const addQuantity = () => handleQuantity(quantity + 1);

  const reduceQuantity = () => handleQuantity(quantity - 1);

  const quantityButton = (
    <ButtonGroup isIconOnly color="primary" radius="full" size="sm">
      <Button onClick={reduceQuantity}>-</Button>
      <Button>{quantity}</Button>
      <Button onClick={addQuantity}>+</Button>
    </ButtonGroup>
  );

  const handleOpen = () => {
    if (userEmail === "1") router.push("/login");
    else onOpen();
  };

  const alert = (
    <StockList isOpen={isOpen} title={`Put the quantity of ${collectData?.name}`} onClose={onClose}>
      <div>
        <div className="flex flex-row justify-between border-1 p-2 items-center rounded-lg mb-4">
          <h3 className="text-lg font-semibold">Quantity :</h3>
          {quantityButton}
        </div>

        <Button
          key={"buy"}
          className="w-full"
          color="primary"
          isDisabled={availableStock < quantity}
          variant="solid"
          onClick={() => handleAddtoCart()}
        >
          <ShoppingCart /> Add {quantity} to cart
        </Button>
      </div>
    </StockList>
  );

  const handleAddtoCart = () => {
    const cartItem: CartItem = { product: collectData!, quantity };

    addItemToCart(cartItem, userEmail);
    onClose();
  };

  if (isLoading) {
    return <Loading title="Product" />;
  }

  return (
    <div className="grid gap-4 grid-rows-[1fr_auto] h-full overflow-hidden">
      <ScrollShadow className="h-full w-full flex flex-col">
        <div className="w-full">
          <Image
            isZoomed
            alt={collectData?.images[0]?.altText || collectData?.name}
            className="w-full aspect-video object-contain"
            fallbackSrc="https://via.placeholder.com/500x500"
            src={collectData?.images[0]?.url}
            width={500}
          />
        </div>
        <div className="flex flex-row justify-start text-xl font-bold items-start mt-4">
          <h1>{toCapital(collectData?.name || "")}</h1>
        </div>
        <p className="text-2xs">{collectData?.category}</p>
        <br />
        <div className="flex flex-row justify-between items-center">
          <p className="text-secondary font-semibold text-lg">Rp {collectData?.price},-</p>
          <p className="text-foreground font-medium text-lg">{availableStock} Available</p>
        </div>
        <br />
        <div className="mb-4">
          <h3 className="text-sm font-semibold my-2">About the product</h3>
          <p className="text-xs">{collectData?.description}</p>
        </div>
      </ScrollShadow>
      <Button
        className="w-full opacity-90 hover:opacity-100"
        color="primary"
        isDisabled={availableStock === 0}
        radius="sm"
        size="lg"
        onClick={handleOpen}
      >
        <ShoppingCart />{" "}
        {availableStock === 0
          ? "Out of stock"
          : userEmail === "1"
            ? "Login to buy"
            : `Add ${quantity > 1 && quantity} to cart`}
      </Button>
      {alert}
    </div>
  );
};

export default ProductDetail;
