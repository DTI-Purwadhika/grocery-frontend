import { usePathname } from "next/navigation";

export const useCurrentPath = () => {
  const currentPath = usePathname();

  const isCurrentPath = (path: string) => {
    return currentPath === path;
  };

  const getLastSegment = () => {
    const segments = currentPath.split("/").filter(Boolean);
    return segments.pop();
  };

  return { currentPath, isCurrentPath, getLastSegment };
};
