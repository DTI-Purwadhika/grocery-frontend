"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

import { useCurrentPath } from "@/hooks/useCurrentPath";

const BackButton = () => {
  const router = useRouter();
  const { currentPath } = useCurrentPath();

  if (currentPath === "/") return null;

  return (
    <Button isIconOnly size="sm" variant="light" onClick={() => router.back()}>
      <MoveLeft />
    </Button>
  );
};

export default BackButton;
