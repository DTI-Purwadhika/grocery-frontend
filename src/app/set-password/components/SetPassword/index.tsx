"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

import { SetNewPassword } from "@/hooks/SetNewPassword";
import { CheckVerificationLink } from "@/hooks/CheckVerificationLink";
import { RequestNewVerification } from "@/hooks/RequestNewVerification";

export type setPasswordData = {
  password: string;
};

export const SetPasswordForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { onOpenChange, isOpen, onOpen } = useDisclosure();
  const { SetPassword, isLoading } = SetNewPassword();
  const { isSending, isSent, SendNewVerification } = RequestNewVerification();
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const email_alt = email!.replace("%40", "@");
  const emailToken = { email: email_alt, token: token };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<setPasswordData>();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await CheckVerificationLink(emailToken);

        setLoading(false);
        setStatus(status);
      } catch (error) {
        setStatus("");
      }
    };

    checkStatus();
  }, [token, email]);

  const closeModal = () => {
    router.push("/login");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendLink = () => {
    try {
      SendNewVerification(email);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  const onSubmit = async (data: setPasswordData) => {
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
      {status === "User not verified" ? (
        <>
          <div className="w-4/5 max-w-[425px] bg-white p-6 rounded-lg shadow-md lg:w-full">
            <h1 className="text-xl font-bold text-center text-black">Verify Your Account</h1>
            <p className="text-xs text-center text-gray-400 mb-6">
              Fill up the form to set a password and verify your account.
            </p>
            <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  className="w-full py-2 px-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                {isLoading ? "Loading..." : "Save Password"}
              </button>
            </form>
          </div>

          <Modal
            backdrop="blur"
            className="w-2/3 lg:w-max"
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
                  <ModalHeader className="flex justify-center font-bold text-lg lg:text-xl">
                    Your Account Has Been Verified!
                  </ModalHeader>
                  <ModalBody className="flex items-center">
                    <p className="font-semibold text-sm lg:text-medium">
                      Yay! Your account has been verified and you can close this modal to login.
                    </p>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : status === "User verified" ? (
        <Modal
          backdrop="transparent"
          classNames={{
            base: "bg-green-600",
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
                  Your Account Has Been Verified!
                </ModalHeader>
                <ModalBody className="flex items-center">
                  <p className="font-semibold">
                    {}
                    Yay! Your account has been verified and you can click
                    <span>
                      {" "}
                      <Link
                        className="text-blue-300 font-semibold mt-2 hover:underline"
                        href={"/login"}
                      >
                        here
                      </Link>{" "}
                    </span>
                    to login.
                  </p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
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
                  Verification Link Expired!
                </ModalHeader>
                <ModalBody className="flex items-center">
                  <p className="font-bold">
                    Please click the button below to request a new verification link.
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
                      A new verification link has been sent to your email. Please check your email
                      inbox or spam to verify your account.
                    </p>
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
