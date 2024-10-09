import { Suspense } from "react";

import { Loading } from "@/components/elements";

import { TabType } from "./type";

import TabContent from ".";

const TabWrapper = ({ category }: TabType) => (
  <Suspense fallback={<Loading title={category} />}>
    <TabContent category={category} />
  </Suspense>
);

export default TabWrapper;
