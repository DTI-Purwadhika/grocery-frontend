import { Button } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/providers/CartProviders";

const Total = () => {
  const { cart } = useCart();

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + (item?.product.price || 0) * item.quantity, 0) || 0;
  // const shipping = 8000;
  // const total = subtotal + shipping;

  return (
    <div>
      {/* <div className="flex flex-row justify-between">
        <span>Subtotal</span>
        <span>: Rp {subtotal},-</span>
      </div>
      <div className="flex flex-row justify-between my-2">
        <span>Shipping</span>
        <span>: Rp {shipping},-</span>
      </div> */}
      <hr className="my-3" />
      <div className="flex flex-row justify-between font-semibold text-lg">
        <span>Total</span>
        <span>: Rp {subtotal},-</span>
      </div>
      <Button className="w-full mt-6 mb-4" color="primary" radius="sm" size="lg">
        <ShoppingCart /> Continue to Checkout
      </Button>
    </div>
  );
};

export default Total;
