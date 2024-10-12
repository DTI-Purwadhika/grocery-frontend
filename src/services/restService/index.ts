"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";

// * data?: any, karena kita tidak tahu bentuk data yang akan kita terima
const restService = async (endpoint: string, method: string = "GET", data?: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("Sid");

  if(endpoint.startsWith("products") || endpoint.startsWith("categories")){
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
      const resultData = result.data;
      const totalData = resultData.totalElements;
      const totalPage = resultData.totalPages;
      const content = resultData.content;
  
      return { content, totalData, totalPage, resultData };
    } catch (error) {
      throw new Error(`Can't catch ${endpoint}: ${error}`);
    }
  }else{
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${method} ${endpoint}`);
      }
      const result = await response.json();
      const resultData = result.data;
      const totalData = resultData.totalElements;
      const totalPage = resultData.totalPages;
      const content = resultData.content;
  
      return { content, totalData, totalPage, resultData };
    } catch (error) {
      throw new Error(`Can't catch ${endpoint}: ${error}`);
    }
  }
  
  
};

export default restService;
