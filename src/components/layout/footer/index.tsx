"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Blocks, Heart, House, ShoppingCart, User } from "lucide-react";

import { useCurrentPath } from "@/hooks/useCurrentPath";

const Footer = () => {
  const { isCurrentPath } = useCurrentPath();

  return (
    <footer className="w-full border-t-1 grid grid-cols-5 text-xs md:text-lg lg:hidden">
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
        href="/favorite"
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
        <ShoppingCart /> Cart
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
  );
};

export default Footer;
