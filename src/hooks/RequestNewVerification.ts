import { useState } from "react";

export const RequestNewVerification = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const SendNewVerification = async (email: string | null) => {
    setIsSending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/new-verification-link?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to send new verification link");
      }

      setIsSending(false);
      setIsSent(true);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  return { isSending, isSent, SendNewVerification };
};
