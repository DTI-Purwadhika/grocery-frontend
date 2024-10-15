"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";

import { RequestResetPassword } from "@/hooks/RequestResetPassword";
import { RequestNewVerification } from "@/hooks/RequestNewVerification";

type resetPasswordData = {
  email: string;
};

export const ResetPasswordRequestForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<resetPasswordData>({ defaultValues: { email: "" } });

  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { onOpenChange, isOpen, onOpen, onClose } = useDisclosure();
  const { isSending, isSent, SendNewVerification } = RequestNewVerification();
  const { SendResetPasswordLink, isLoading } = RequestResetPassword();

  const sendVerificationLink = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userid?email=${email}`,
      );
      const data = await response.json();

      SendNewVerification(data.data);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  const closeModal = () => {
    if (status === "Successful") {
      router.push("/login");
    } else if (status === "User not registered") {
      router.push("/register");
    } else {
      onClose();
    }
  };

  const onSubmit = async (data: resetPasswordData) => {
    try {
      const result = await SendResetPasswordLink(data.email);

      setStatus(result);
      setEmail(data.email);
      onOpen();
      reset();
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-green-300">
        <div className="w-4/5 max-w-[400px] bg-white p-6 rounded-lg shadow-md lg:w-full">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-black text-center">Reset Password</h1>
          </div>
          <p className="text-xs text-center text-gray-400 mb-6">
            Please enter your email and we&apos;ll send you a link to reset your password.
          </p>
          <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <input
                className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                placeholder="Email"
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              />
              {errors.email && <div className="text-red-500 text-xs">{errors.email?.message}</div>}
              <button
                className="mt-2 py-2 px-4 text-sm font-semibold w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading ... " : "Send Reset Password Link"}
              </button>
            </div>
            <Link
              className="text-blue-500 text-sm text-center font-semibold hover:underline"
              href="/login"
            >
              Return to log in
            </Link>
          </form>
        </div>
        <Modal
          backdrop="blur"
          classNames={{
            base: "bg-slate-500",
            closeButton: "hover:bg-red-600 transition duration-300 text-white",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          placement="center"
          onClose={closeModal}
          onOpenChange={onOpenChange}
        >
          <ModalContent className="text-black">
            {() => (
              <>
                <ModalHeader className="flex justify-center font-bold text-2xl">
                  {status === "Successful" && "Reset Password Link Sent"}
                  {status === "User not registered" && "Account Not Found"}
                  {status === "User not verified" && "Account Not Verified"}
                </ModalHeader>
                <ModalBody className="flex items-center">
                  <p className="font-bold">
                    {status === "Successful" &&
                      "A reset password link has been sent to your email. Please check your email inbox or spam to reset your password."}
                    {status === "User not registered" &&
                      "Account with this email not found. Please register first."}
                    {status === "User not verified" &&
                      "Your account has not been verified. Please click the button below to verify your account."}
                  </p>
                  {status === "User not verified" && (
                    <button
                      className="mt-2 py-2 px-4 text-sm font-semibold w-auto text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                      disabled={isSending || isSent}
                      type="button"
                      onClick={sendVerificationLink}
                    >
                      {isSending ? "Loading..." : "Request New Link"}
                    </button>
                  )}
                  {status === "User not verified" && isSent && (
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
      </div>
    </>
  );
};
