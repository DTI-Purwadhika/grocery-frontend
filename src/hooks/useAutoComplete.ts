import { useInfiniteQuery } from "@tanstack/react-query";

import restService from "@/services/restService";

export type dataType = {
  id: number;
  name: string;
};

export const useAutoComplete = ({ title = "", keyword = "" }) => {
  const size = 8;

  const fetchData = async ({ pageParam = 0 }) => {
    const endpoint = `${title}?keyword=${keyword?.toLowerCase()}&size=${size}&page=${pageParam}`;
    const { content, totalData, resultData } = await restService(endpoint);
    const data = title === "stores" ? resultData : content;

    return {
      data,
      hasMore: (pageParam + 1) * size < totalData,
    };
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["autocomplete", title, keyword],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length : undefined),
  });

  const collectData = data?.pages.flatMap((page) => page.data) || [];

  return {
    collectData,
    isLoading,
    hasMore: hasNextPage,
    onLoadMore: fetchNextPage,
    isFetchingNextPage,
  };
};
