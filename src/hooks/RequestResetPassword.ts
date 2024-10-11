import { useState } from "react";

export const RequestResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const SendResetPasswordLink = async (email: string | null) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/reset-password?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to send reset pasword link");
      }

      const result = await response.json();
      setIsLoading(false);

      return result.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return null;
    }
  };

  return { SendResetPasswordLink, isLoading };
};
