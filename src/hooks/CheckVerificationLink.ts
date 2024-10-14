export type idToken = {
  id: string | null;
  token: string | null;
};

export const CheckVerificationLink = async (data: idToken) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/check-verification-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get verification link status");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);

    return null;
  }
};
