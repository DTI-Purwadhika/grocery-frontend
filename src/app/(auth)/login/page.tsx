import React, { Suspense } from "react";

import { LoginForm } from "./components/Login";

const login: React.FC = () => {
  return (
    <>
      <Suspense>
        <main className="bg-green-500">
          <LoginForm />
        </main>
      </Suspense>
    </>
  );
};

export default login;
