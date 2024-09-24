"use client";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { toCapital } from "@/services/formatter";

const TitleApp = () => {
  const { currentPath } = useCurrentPath();
  const title = currentPath.split("/").filter(Boolean).pop();
  const titleApp = title?.replace(/-/g, " ");

  return <h1 className="text-2xl font-semibold">{toCapital(titleApp || "Grocery App")}</h1>;
};

export default TitleApp;
