import { Suspense } from "react";

import { Loading } from "@/components/elements";

import PaymentButton from ".";

const PaymentButtonWrapper = () => (
  <Suspense fallback={<Loading title="Payment Method" />}>
    <PaymentButton />
  </Suspense>
);

export default PaymentButtonWrapper;
