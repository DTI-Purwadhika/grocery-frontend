import React from "react";
import { Construction } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <>
      <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
        <Construction className="text-foreground-600 mb-4" size={100} />
        <h2 className="text-2xl mb-1">Still Building Hero.</h2>
        <p>Come later to see what we build for you.</p>
      </div>
    </>
  );
};
