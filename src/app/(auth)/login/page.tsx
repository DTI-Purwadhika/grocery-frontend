import React, { Suspense } from "react";

import { LoginForm } from "./components/Login";
import { SuspenseFallback } from "@/components/elements/SuspenseFallback";

const login: React.FC = () => {
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <main className="bg-green-500">
          <LoginForm />
        </main>
      </Suspense>
    </>
  );
};

export default login;
