"use server";
import { API_URL } from "@/constants";

export const restService = async (endpoint: string, method: string = "GET", data?: any) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method} ${endpoint}`);
    }
    const result = await response.json();
    const totalData = result.data.totalElements;
    const totalPage = result.data.totalPages;
    const content = result.data.content;

    return { content, totalData, totalPage };
  } catch (error) {
    throw new Error(`Can't catch ${endpoint}: ${error}`);
  }
};

export default restService;
