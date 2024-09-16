"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export const useCurrentPath = () => {
  const currentPath = usePathname();

  const isCurrentPath = useCallback(
    (path: string) => {
      if (path === "home" && currentPath === "/") return true;

      return currentPath.includes(path);
    },
    [currentPath],
  );

  return { currentPath, isCurrentPath };
};
