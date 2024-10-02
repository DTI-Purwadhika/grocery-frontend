import { Suspense } from "react";

import { Loading } from "@/components/elements";

import Payment from ".";

const StoreSelectWrapper = () => (
  <Suspense fallback={<Loading title="Payment Method" />}>
    <Payment />
  </Suspense>
);

export default StoreSelectWrapper;
