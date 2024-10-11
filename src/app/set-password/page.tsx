import { Suspense } from "react";

import { SetPasswordForm } from "./components/SetPassword";
// import { SetPasswordForm } from "./components/SetPassword/index2";

const register = () => {
  return (
    <>
      <Suspense>
        <main>
          <SetPasswordForm />
        </main>
      </Suspense>
    </>
  );
};

export default register;
