import { useState } from "react";

export const SetNewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const SetPassword = async (formData: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/set-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Set password failed");
      }

      const result = await response.json();

      setIsLoading(false);

      return result;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
      setIsLoading(false);

      return null;
    }
  };

  return { SetPassword, isLoading };
};
