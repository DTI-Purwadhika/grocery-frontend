import { useState } from "react";

export const RequestNewVerification = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const SendNewVerification = async (id: string | null) => {
    setIsSending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/new-verification-link?id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setIsError(true);
        throw new Error("Failed to send new verification link");
      }

      setIsSending(false);
      setIsSent(true);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
      setIsSending(false);
    }
  };

  return { isSending, isSent, SendNewVerification, isError };
};
