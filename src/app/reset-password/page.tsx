import React, { Suspense } from "react";

import { ResetPasswordForm } from "./components/ResetPassword";

const resetPassword: React.FC = () => {
  return (
    <>
      <Suspense>
        <main className="bg-green-500">
          <ResetPasswordForm />
        </main>
      </Suspense>
    </>
  );
};

export default resetPassword;
