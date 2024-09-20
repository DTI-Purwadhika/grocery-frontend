import restService from "@/services/restService";

export const fetchData = async ({
  queryKey,
}: {
  queryKey: [string, string, number, number, string, string, string, string];
}) => {
  const [title, keyword, page, size, sortBy, sortDir, category, stores] = queryKey;
  const endpoint = `${title.toLowerCase()}?keyword=${encodeURIComponent(keyword.toLowerCase())}&category=${encodeURIComponent(category)}&page=${page - 1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir.replace("ending", "")}&storeId=${stores}`;
  const { content, totalData, totalPage } = await restService(endpoint);

  return {
    content,
    totalData,
    totalPage,
  };
};
