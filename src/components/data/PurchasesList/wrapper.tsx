import { Suspense } from "react";

import { Loading } from "@/components/elements";

import PurchasesList from ".";

const PurchaseListWrapper = () => (
  <Suspense fallback={<Loading title="Payment Method" />}>
    <PurchasesList />
  </Suspense>
);

export default PurchaseListWrapper;
