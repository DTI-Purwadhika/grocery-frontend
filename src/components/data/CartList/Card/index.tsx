import { Button, ButtonGroup } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { CircleX } from "lucide-react";

import { useCart } from "@/providers/CartProviders";
import { CartItem } from "@/providers/CartProviders/type";

const CardCart = ({ cartId, item }: { cartId: number; item: CartItem }) => {
  const { updateItemQuantity, removeItemFromCart } = useCart();

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-2 rounded-md">
        <Image
          isZoomed
          alt={item.product.name}
          className="object-contain"
          fallbackSrc="https://via.placeholder.com/500x500"
          height={100}
          src={item.product.images.toString()}
          width={100}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-between">
        <h3 className="text-medium font-semibold">{item.product.name}</h3>
        <p className="text-2xs text-default-500 font-medium">Rp {item.product.price} / kg</p>
        <br />
        <p className="font-semibold text-sm">Rp {(item.product.price || 0) * item.quantity}</p>
      </div>
      <div className="flex flex-col justify-between items-end text-medium">
        <CircleX
          className="text-gray-400 text-sm"
          onClick={() => removeItemFromCart(cartId, item.product.id)}
        />
        <ButtonGroup isIconOnly color="primary" radius="full" size="sm">
          <Button onClick={() => updateItemQuantity(cartId, item.product.id, item.quantity - 1)}>
            -
          </Button>
          <Button disabled>{item.quantity}</Button>
          <Button onClick={() => updateItemQuantity(cartId, item.product.id, item.quantity + 1)}>
            +
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CardCart;
