import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export type AddressDataResponse = {
  id: number;
  addressName: string;
  postcode: string;
  city: string;
  lat: number;
  lng: number;
  isPrimary: boolean;
};

export const getAddress = (id: number) => {
  const cookieValue = getCookie("Sid");
  const [address, setAddress] = useState<AddressDataResponse>();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${id}`,
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
          throw new Error("Failed to fetch address data");
        }

        const data = await response.json();

        setAddress(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, []);

  return address;
};
