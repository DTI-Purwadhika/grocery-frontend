"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Suspense } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import restService from "@/services/restService";
import { Category } from "@/constants/entity";
import { toCapital } from "@/services/formatter";
import { Loading } from "@/components/elements";

import TabContent from "./Tab/wrapper";

const fetchCategories = async ({ pageParam = 1 }) => {
  const endpoint = `categories?page=${pageParam}&size=50`;
  const { content } = await restService(endpoint);

  return content;
};

const Datatabs = () => {
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length === 50 ? pages.length + 1 : undefined),
  });

  const collectData = data?.pages.flat() || [];

  if (isLoading) return <Loading title="Catalog" />;

  const tabsCategory: Category[] = [
    { name: "All Category", description: "All available categories" },
    ...collectData.map((item) => ({
      name: item.name,
      description: item.description,
    })),
  ];

  return (
    <Suspense fallback={<Loading title="Catalog" />}>
      <Tabs
        fullWidth
        aria-label="Catalog tabs"
        color="primary"
        isDisabled={isLoading}
        items={tabsCategory}
        variant="underlined"
      >
        {(item: Category) => (
          <Tab key={item.name} title={toCapital(item?.name)}>
            <TabContent category={item.name} />
          </Tab>
        )}
      </Tabs>
    </Suspense>
  );
};

export default Datatabs;
