import { signOut } from "next-auth/react";
import { setCookie } from "cookies-next";

export const useLogout = () => {
  const logout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setCookie("Sid", null, { maxAge: 0 });

      await signOut({ redirectTo: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
