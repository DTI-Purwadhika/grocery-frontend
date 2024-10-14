import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export type ShippingDataResponse = {
  id: number;
  origin: string;
  destination: string;
  courier: string;
  cost: number;
  description: string;
  etd: string;
};

export const useShipping = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookieValue = getCookie("Sid");
  const [shipping, setShipping] = useState<ShippingDataResponse[]>([]);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipping`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${cookieValue}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch shipping data");
        }

        setIsLoading(false);

        const data = await response.json();

        setShipping(data.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchShipping();
  }, []);

  return { shipping, isLoading };
};
