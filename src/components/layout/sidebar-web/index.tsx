"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Badge } from "@nextui-org/badge";
import { Blocks, House, Receipt, ShoppingCart, User } from "lucide-react";
import { useMemo } from "react";

import { useCurrentPath } from "@/hooks/useCurrentPath";
import { useCart } from "@/providers/CartProviders";

const SideBar = () => {
  const { cartCount } = useCart();
  const { isCurrentPath } = useCurrentPath();

  const aside = useMemo(
    () => (
      <aside className="sticky top-0 bg-background h-fit w-1/2 mx-auto mt-4 hidden lg:grid-cols-1 text-xs md:text-lg lg:grid">
        <Button
          as={Link}
          className="w-full h-full py-4 rounded-lg flex flex-col gap-1 items-center"
          color={isCurrentPath("home") ? "primary" : "default"}
          href="/"
          variant="light"
        >
          <House /> Home
        </Button>
        <Button
          as={Link}
          className="w-full h-full py-4 rounded-lg flex flex-col gap-1 items-center"
          color={isCurrentPath("catalog") ? "primary" : "default"}
          href="/catalog"
          variant="light"
        >
          <Blocks /> Catalog
        </Button>
        <Button
          as={Link}
          className="w-full h-full py-4 rounded-lg flex flex-col gap-1 items-center"
          color={isCurrentPath("my-purchases") ? "primary" : "default"}
          href="/my-profile/my-purchases"
          variant="light"
        >
          <Receipt /> Purchases
        </Button>
        <Button
          as={Link}
          className="w-full h-full py-4 rounded-lg flex flex-col gap-1 items-center"
          color={isCurrentPath("my-cart") ? "primary" : "default"}
          href="/my-cart"
          variant="light"
        >
          <Badge color="primary" content={cartCount} isInvisible={cartCount < 1} size="lg">
            <ShoppingCart />
          </Badge>
          Cart
        </Button>
        <Button
          as={Link}
          className="w-full h-full py-4 rounded-lg flex flex-col gap-1 items-center"
          color={isCurrentPath("my-profile") ? "primary" : "default"}
          href="/my-profile"
          variant="light"
        >
          <User /> Profile
        </Button>
      </aside>
    ),
    [cartCount, isCurrentPath],
  );

  return aside;
};

export default SideBar;
