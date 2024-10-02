import { Button } from "@nextui-org/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const CheckoutButton = () => {
  const checkoutButton = useMemo(
    () => (
      <Button
        as={Link}
        className="w-full mt-6 mb-4"
        color="primary"
        href="/my-cart/checkout?method=auto"
        radius="sm"
        size="lg"
      >
        <ShoppingCart /> Continue to Checkout
      </Button>
    ),
    [],
  );

  return checkoutButton;
};

export default CheckoutButton;
