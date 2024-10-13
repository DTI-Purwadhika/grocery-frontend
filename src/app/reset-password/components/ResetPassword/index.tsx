"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";

import { SetNewPassword } from "@/hooks/SetNewPassword";
import { CheckResetPasswordLink } from "@/hooks/CheckResetPasswordLink";
import { RequestNewResetPassword } from "@/hooks/RequestNewResetPassword";

type resetPasswordData = {
  password: string;
};

export const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { onOpenChange, isOpen, onOpen } = useDisclosure();
  const { SetPassword, isLoading } = SetNewPassword();
  const { isSending, isSent, SendNewResetPassword } = RequestNewResetPassword();
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const emailToken = { email: email, token: token };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordData>({ defaultValues: { password: "" } });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await CheckResetPasswordLink(emailToken);

        setLoading(false);
        setValid(status);
      } catch (error) {
        setValid(false);
      }
    };

    checkStatus();
  }, [token, email]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    router.push("/login");
  };

  const sendLink = () => {
    try {
      SendNewResetPassword(email);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  const onSubmit = async (data: resetPasswordData) => {
    try {
      const formDataWithEmail = { ...data, email: email };
      const result = await SetPassword(formDataWithEmail);

      if (result) {
        onOpen();
      }
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-300">
        <h1 className="text-black font-bold text-4xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-300">
      <>
        {valid ? (
          <div className="w-4/5 max-w-[425px] bg-white p-6 rounded-lg shadow-md lg:w-full">
            <h1 className="text-2xl text-black font-bold text-center">Reset Password</h1>
            <h2 className="text-xs text-center text-gray-400 mb-6">
              Fill up the form to set your new password.
            </h2>
            <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 6,
                      matchPattern: (value) =>
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value),
                    },
                  })}
                />
                <button
                  className="absolute inset-y-0 right-3 flex items-center"
                  type="button"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? (
                    <PiEyeBold className="h-5 w-5 text-gray-600" />
                  ) : (
                    <PiEyeClosedBold className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <div className="text-red-500 text-xs">Password is required</div>
              )}
              {errors.password?.type === "checkLength" && (
                <div className="text-red-500 text-xs">
                  Password should be at least 6 characters long
                </div>
              )}
              {errors.password?.type === "matchPattern" && (
                <div className="text-red-500 text-xs">
                  Password should contain at least one uppercase letter, lowercase letter, digit,
                  and special symbol.
                </div>
              )}

              <button
                className="mt-2 py-2 px-4 text-sm font-semibold w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                type="submit"
              >
                {isLoading ? "Loading... " : "Save Password"}
              </button>
            </form>

            <Modal
              backdrop="blur"
              classNames={{
                base: "bg-green-600",
                closeButton: "hover:bg-red-600 transition duration-300 text-white",
              }}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              isOpen={isOpen}
              placement="center"
              onClose={closeModal}
              onOpenChange={onOpenChange}
            >
              <ModalContent className="text-white">
                {() => (
                  <>
                    <ModalHeader className="flex justify-center font-bold text-2xl">
                      Your Password Has Been Reset Successfully!
                    </ModalHeader>
                    <ModalBody className="flex items-center">
                      <p className="font-semibold">
                        You can now log into your account using your new password.
                      </p>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ) : (
          <Modal
            backdrop="transparent"
            classNames={{
              base: "bg-red-700",
            }}
            hideCloseButton={true}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={true}
            placement="center"
            size="3xl"
            onOpenChange={onOpenChange}
          >
            <ModalContent className="text-white">
              {() => (
                <>
                  <ModalHeader className="flex justify-center font-bold text-2xl">
                    Reset Password Link Expired!
                  </ModalHeader>
                  <ModalBody className="flex items-center">
                    <p className="font-bold">
                      Please click the button below to request a new reset password link.
                    </p>
                    <button
                      className="mt-2 py-2 px-4 text-sm font-semibold w-auto text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                      disabled={isSending || isSent}
                      type="button"
                      onClick={sendLink}
                    >
                      {isSending ? "Loading..." : "Request New Link"}
                    </button>
                    {isSent && (
                      <p className="font-bold">
                        A new reset password link has been sent to your email. Please check your
                        email inbox or spam to reset your password.
                      </p>
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </>
    </div>
  );
};
