import { Button } from "@nextui-org/button";
import { CreditCard } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import restService from "@/services/restService";
import { useCart } from "@/providers/CartProviders";

const PaymentButton = () => {
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUrl = () => {
    const currentMethod = localStorage.getItem("method") ? localStorage.getItem("method") : "auto";
    const endpoint: string = `checkouts/${cart.id}?method=${currentMethod}`;

    sendUrl(endpoint);
  };

  const sendUrl = async (endpoint: string) => {
    const { resultData } = await restService(endpoint, "POST");

    router.push(resultData.invoiceUrl);
  };

  const handleCheckout = () => {
    setLoading(true);
    fetchUrl();
  };

  const button = useMemo(
    () => (
      <Button
        className="w-full mt-6 mb-4"
        color="primary"
        isDisabled={loading}
        radius="sm"
        size="lg"
        onClick={handleCheckout}
      >
        <CreditCard /> {loading ? "Prepare your Payment..." : "Proceed to Payment"}
      </Button>
    ),
    [loading],
  );

  return button;
};

export default PaymentButton;
