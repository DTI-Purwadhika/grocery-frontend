import { usePathname } from "next/navigation";

export const useCurrentPath = () => {
  const currentPath = usePathname();

  const isCurrentPath = (path: string) => {
    if (path === "home" && currentPath === "/") return true;

    return currentPath.includes(path);
  };

  const getLastSegment = () => {
    const segments = currentPath.split("/").filter(Boolean);

    return segments.pop();
  };

  return { currentPath, isCurrentPath, getLastSegment };
};
