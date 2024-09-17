"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useCurrentPath } from "./useCurrentPath";

export const useQuery = () => {
  const { currentPath } = useCurrentPath();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getQueryParam = useCallback(
    (param: string) => {
      return searchParams.get(param);
    },
    [searchParams],
  );

  const setQueryParam = useCallback(
    (param: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      !value ? params.delete(param) : params.set(param, value);
      router.push(`${currentPath}?${params.toString()}`, { scroll: false });
    },
    [searchParams, currentPath, router],
  );

  return { currentPath, getQueryParam, setQueryParam };
};
