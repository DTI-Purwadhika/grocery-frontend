import { Button } from "@nextui-org/button";
import { ReceiptText, PackageCheck } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
        <PackageCheck className="text-foreground-600 mb-4" size={125} />
        <h2 className="text-2xl font-bold mb-3 mt-4">Your Order is Confirmed!</h2>
        <p className="text-sm">
          Your order has been placed succesfully and is on it&apos;s way to being processed.
        </p>
      </div>
      <Button as={Link} color="primary" href="/my-profile/my-purchases" radius="sm" size="lg">
        <ReceiptText /> Track my order
      </Button>
    </div>
  );
};

export default Success;
