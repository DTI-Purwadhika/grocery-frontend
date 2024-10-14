import React, { Suspense } from "react";

import { ResetPasswordForm } from "./components/ResetPassword";
import { SuspenseFallback } from "@/components/elements/SuspenseFallback";

const resetPassword: React.FC = () => {
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <main className="bg-green-500">
          <ResetPasswordForm />
        </main>
      </Suspense>
    </>
  );
};

export default resetPassword;
