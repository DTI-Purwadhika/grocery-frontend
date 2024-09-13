"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import restService from "@/services/restService";
import { Category } from "@/constants/entity";
import { toCapital } from "@/services/formatter";

import TabContent from "./Tab";

const Datatabs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [collectData, setCollectData] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const endpoint = `categories?size=${50}`;
    const { content } = await restService(endpoint);

    setCollectData(content);
    setIsLoading(false);
  };

  return (
    <Tabs
      fullWidth
      aria-label="Catalog tabs"
      color="primary"
      isDisabled={isLoading}
      items={collectData}
      variant="underlined"
    >
      {(item) => (
        <Tab key={item.name} title={toCapital(item?.name)}>
          <TabContent category={item.name} />
        </Tab>
      )}
    </Tabs>
  );
};

export default Datatabs;
