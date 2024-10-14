import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export type PrimaryAddress = {
  id: number;
  addressName: string;
  city: string;
};

export const getPrimaryAddress = () => {
  const cookieValue = getCookie("Sid");
  const [primaryAddressData, setPrimaryAddressData] = useState<PrimaryAddress>();

  useEffect(() => {
    const fetchPrimaryAddress = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/primary`,
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
          throw new Error("Failed to fetch primary address data");
        }

        const data = await response.json();
        setPrimaryAddressData({
          id: data.data.id,
          addressName: data.data.addressName,
          city: data.data.city.name,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchPrimaryAddress();
  }, []);

  return primaryAddressData;
};
