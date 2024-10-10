import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  referralCode: string;
  isVerified: boolean;
};

export const useProfile = () => {
  const cookieValue = getCookie("Sid");
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${cookieValue}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserProfile(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return { userProfile };
};
