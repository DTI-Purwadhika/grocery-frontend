import { Suspense } from "react";

import { SetPasswordForm } from "./components/SetPassword";
import { SuspenseFallback } from "@/components/elements/SuspenseFallback";
// import { SetPasswordForm } from "./components/SetPassword/index2";

const register = () => {
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <main>
          <SetPasswordForm />
        </main>
      </Suspense>
    </>
  );
};

export default register;
