import { Category, Product, Admin } from "@/constants/entity";
import restService from "@/services/restService";

export const fetchData = async ({
  queryKey,
}: {
  queryKey: [string, string, number, number, string, string, string, string];
}) => {
  const [title, keyword, page, size, sortBy, sortDir, category, stores] = queryKey;
  let endpoint = title.toLowerCase() === "users" ? `admins?` : `${title.toLowerCase()}?`;

  if (keyword.length > 0) endpoint += `keyword=${encodeURIComponent(keyword.toLowerCase())}&`;
  if (category.length > 0) endpoint += `category=${encodeURIComponent(category)}&`;
  if (stores.length > 0) endpoint += `storeId=${stores}&`;
  if (title.toLowerCase() === "users") endpoint += `roleKeyword=CUSTOMER&`;
  if (title.toLowerCase() === "admins") endpoint += `roleKeyword=ADMIN&`;

  const url = `${endpoint}page=${page - 1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir.replace("ending", "")}`;

  const { content, totalData, totalPage } = await restService(url);

  return {
    content,
    totalData,
    totalPage,
  };
};

export const fetchById = async (title: string, id: number): Promise<Category | Product | Admin> => {
  const { resultData } = await restService(`${title}/${id}`, "GET");

  return resultData;
};

export const saveData = async (
  title: string,
  type: "create" | "update",
  id: number | undefined,
  data: Category | Product | Admin,
) => {
  const url = type === "update" ? `${title}/${id}` : `${title}`;
  const method = type === "update" ? "PUT" : "POST";

  return restService(url, method, data);
};
