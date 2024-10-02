import { Button } from "@nextui-org/button";
import { CreditCard } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useParam } from "@/hooks/useParam";
import restService from "@/services/restService";
import { useCart } from "@/providers/CartProviders";

const PaymentButton = () => {
  const { getQueryParam } = useParam();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUrl = async () => {
    const endpoint = `checkouts/${cart.id}?method=${getQueryParam("method")}`;
    const { resultData } = await restService(endpoint, "POST");
    // await restService(`cart/${cart.id}/clear`, "DELETE");

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
