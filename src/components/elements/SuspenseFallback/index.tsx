import { Spinner } from "@nextui-org/spinner";
import React from "react";

export const SuspenseFallback: React.FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col gap-5 items-center justify-center min-h-screen">
      <Spinner size="lg" color="primary" />
      <p className="text-black font-bold text-4xl">Loading...</p>
    </div>
  );
};
