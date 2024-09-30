import { Button } from "@nextui-org/button";
import { ShoppingCart, PackageX } from "lucide-react";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
        <PackageX className="text-foreground-600 mb-4" size={125} />
        <h2 className="text-2xl font-bold mb-3 mt-4">Your Payment Failed!</h2>
        <p className="text-sm">
          Don&apos;t worry, you still can try again in a while. Let&apos;s go back to your cart!
        </p>
      </div>
      <Button as={Link} color="primary" href="/my-cart" radius="sm" size="lg">
        <ShoppingCart /> Back to Cart
      </Button>
    </div>
  );
};

export default Failed;
