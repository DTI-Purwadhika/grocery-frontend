import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { City } from "@/constants/city";

const useCities = () => {
    const cookieValue = getCookie("Sid");
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cities`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // @ts-ignore
                    Authorization: `Bearer ${cookieValue}`,
                },
                credentials: "include",
                })

                if(!response.ok){
                    throw new Error("Failed to fetch cities");
                }

                const data = await response.json();
                setCities(data.data);
            }catch(error){
                console.error(error);
            }
        }

        fetchCities();
    }, []);

    return cities;
}

export default useCities;