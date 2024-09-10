import { useEffect, useState } from "react";

import restService from "@/services/restService";

export type dataType = {
  id: number;
  name: string;
};

export const useAutoComplete = ({ title = "", keyword = "" }) => {
  const [collectData, setCollectData] = useState<dataType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 10;

  const fetchData = async (newPage: number) => {
    setIsLoading(true);
    const endpoint = `${title}?keyword=${keyword?.toLowerCase()}&size=${size}&page=${newPage}`;

    const { content, totalData } = await restService(endpoint);

    if (newPage === 0) setCollectData(content);
    else setCollectData((prevData) => [...prevData, ...content]);

    setHasMore((newPage + 1) * size < totalData);
    setIsLoading(false);
  };

  useEffect(() => {
    setCollectData([]);
    setPage(0);
    setHasMore(true);
    fetchData(0);
  }, [title, keyword]);

  const onLoadMore = () => {
    if (hasMore && !isLoading) {
      const newPage = page + 1;

      setPage(newPage);
      fetchData(newPage);
    }
  };

  return {
    collectData,
    hasMore,
    isLoading,
    onLoadMore,
  };
};
