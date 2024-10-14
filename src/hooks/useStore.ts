import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

type storeDataResponse = {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  lat: number;
  lng: number;
};

export const useStore = (id: string | string[]) => {
  const cookieValue = getCookie("Sid");
  const [store, setStore] = useState<storeDataResponse>();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/stores/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // @ts-ignore
              Authorization: `Bearer ${cookieValue}`,
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch store data");
        }

        const data = await response.json();

        setStore(data.data);
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    };

    fetchStore();
  }, []);

  return { store };
};
