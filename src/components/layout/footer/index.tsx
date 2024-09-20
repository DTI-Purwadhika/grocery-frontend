"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Badge } from "@nextui-org/badge";
import { Blocks, Heart, House, ShoppingCart, User } from "lucide-react";
import { useMemo } from "react";

import { useCurrentPath } from "@/hooks/useCurrentPath";
import { useCart } from "@/providers/CartProviders";

const Footer = () => {
  const { cartCount } = useCart();
  const { isCurrentPath } = useCurrentPath();

  const footer = useMemo(
    () => (
      <footer className="bg-background w-full border-t-1 grid grid-cols-5 text-xs md:text-lg lg:hidden">
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
          color={isCurrentPath("favorite") ? "primary" : "default"}
          href="/my-favorite"
          variant="light"
        >
          <Heart /> Favorite
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
      </footer>
    ),
    [cartCount, isCurrentPath],
  );

  return footer;
};

export default Footer;
