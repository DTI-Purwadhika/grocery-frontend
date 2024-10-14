import React from "react";

import { ResetPasswordRequestForm } from "./components/ResetPasswordRequest";

const resetPasswordEmail: React.FC = () => {
  return (
    <>
      <main className="bg-green-500">
        <ResetPasswordRequestForm />
      </main>
    </>
  );
};

export default resetPasswordEmail;
