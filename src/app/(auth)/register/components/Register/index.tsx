"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { roles } from "@/constants/role";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type registerData = {
  name: string;
  email: string;
  role: string;
  referralCode: string;
};

export const RegisterForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerData>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      referralCode: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const onSubmit = async (data: registerData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.error === "Email already registered with social account") {
          throw new Error("Email already registered with social account");
        } else if (result.error === "Account with this email already registered") {
          throw new Error("Account with this email already registered");
        }
      }

      setIsLoading(false);
      reset();

      toast.success("Registration successful!", {
        position: "top-center",
        description:
          "A verification link has been sent to your email. Please check your email inbox or spam to verify your account.",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: any) {
      reset();
      setIsLoading(false);
      console.error(error.message);

      if (error.message === "Email already registered with social account") {
        toast.error(
          "This email has been registered with a social account. Please login using your social account",
          {
            position: "top-center",
          },
        );
      } else if (error.message === "Account with this email already registered") {
        toast.error("Email has been registered. Please use a different email.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      {/* <div className="flex justify-center items-center pt-10 pb-20"> */}
      <div className="flex justify-center items-center min-h-screen bg-green-300">
        <div className="w-4/5 max-w-[400px] bg-white p-6 rounded-lg shadow-md lg:w-full">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-black font-bold mb-4">Register</h1>
          </div>
          <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <input
                id="email"
                type="text"
                placeholder="Email"
                className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              />
              {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
            </div>

            <div className="relative w-full">
              <input
                id="name"
                type="text"
                placeholder="Fullname"
                className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", {
                  required: true,
                  validate: {
                    minLength: (value) => value.length >= 2,
                    maxLength: (value) => value.length <= 30,
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs">Fullname is required.</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500 text-xs">
                  Fullname should be at least 2 characters long.
                </p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="text-red-500 text-xs">
                  Fullname should be maximum 30 characters long.
                </p>
              )}
            </div>

            <div className="relative w-full">
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Role"
                    placeholder="Select a role"
                    size="sm"
                    color="default"
                    variant="faded"
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setRole(e.target.value);
                    }}
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.key} className="text-black">
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            {role === "CUSTOMER" && (
              <div className="relative w-full">
                <input
                  id="referralCode"
                  type="text"
                  placeholder="Referral Code"
                  className="w-full text-black py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("referralCode", {
                    validate: {
                      checkLength: (value) => value.length == 0 || value.length == 8,
                    },
                  })}
                />
                {errors.referralCode?.type === "checkLength" && (
                  <p className="text-red-500 text-xs">Referral code should be 8 characters long.</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 py-2 px-4 text-sm font-semibold w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="px-4 text-gray-500 text-sm">Or continue with:</span>
          </div>

          <button
            onClick={() => signIn("google", { redirectTo: "/" })}
            className="flex gap-2 items-center justify-center w-full border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition duration-300"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-black text-sm font-bold">Google</span>
          </button>
          <div className="text-center w-full text-sm mt-4">
            <span className="text-black">Already have an account? </span>
            <Link href="/login" className="text-blue-500 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
