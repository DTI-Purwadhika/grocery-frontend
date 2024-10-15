"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type loginData = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorType, setErrorType] = useState<string | null>("");

  useEffect(() => {
    const errorParam = params.get("error");

    if (errorParam !== null) {
      openModal(errorParam);
      window.history.replaceState(null, "", "/login");
    }
  }, [params]);

  const openModal = (errorType: string | null) => {
    setErrorType(errorType);
    onOpen();
  };

  const closeModal = () => {
    setErrorType("");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: loginData) => {
    signIn("credentials", {
      ...data,
      redirectTo: "/",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-green-300">
        <div className="w-4/5 max-w-[425px] bg-white p-6 rounded-lg shadow-md lg:w-full">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-black font-bold mb-4">Login</h1>
          </div>
          <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <input
                className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <div className="relative">
              <input
                className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-black"
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
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <button
              className="mt-2 py-2 px-4 text-sm font-semibold w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
              type="submit"
            >
              LOGIN
            </button>
          </form>
          <Link
            className="text-xs text-blue-500 font-semibold mt-2 hover:underline"
            href="/reset-password-request"
          >
            Forgot password?
          </Link>

          <div className="flex items-center justify-center my-4">
            <span className="px-4 text-gray-500 text-sm">Or continue with:</span>
          </div>

          <button
            className="flex gap-2 items-center justify-center w-full border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition duration-300"
            onClick={() => signIn("google", { redirectTo: "/" })}
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-black text-sm font-bold">Google</span>
          </button>
          <div className="text-center w-full text-sm mt-4">
            <span className="text-black">Don&apos;t have an account? </span>
            <Link className="text-blue-500 font-semibold hover:underline" href="/register">
              Register
            </Link>
          </div>
        </div>
        <Modal
          backdrop="blur"
          classNames={{
            base: "bg-red-700",
            closeButton: "hover:bg-yellow-500 transition duration-300 text-white",
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
                <ModalHeader className="flex flex-col gap-1 font-bold">
                  {errorType === "email_not_found" && "Account with this email not found"}
                  {errorType === "account_not_verified" && "Account not verified"}
                  {errorType === "invalid_email_or_password" && "Invalid email or password"}
                  {errorType === "social-login-error" && "Social Login Unavailable"}
                </ModalHeader>
                <ModalBody>
                  {errorType === "email_not_found" && <p>Please register with this email first.</p>}
                  {errorType === "account_not_verified" && (
                    <p>Please verify your account through the link sent to your email.</p>
                  )}
                  {errorType === "invalid_email_or_password" && <p>Please try again.</p>}
                  {errorType === "social-login-error" && (
                    <p>
                      This email is registered as an admin account. Google login is reserved for
                      customers only.
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
