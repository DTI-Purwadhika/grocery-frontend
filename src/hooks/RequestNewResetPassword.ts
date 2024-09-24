import { useState } from "react";

export const RequestNewResetPassword = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const SendNewResetPassword = async (email: string | null) => {
    setIsSending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/new-reset-password-link?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to send new reset password link");
      }

      setIsSending(false);
      setIsSent(true);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  return { isSending, isSent, SendNewResetPassword };
};
