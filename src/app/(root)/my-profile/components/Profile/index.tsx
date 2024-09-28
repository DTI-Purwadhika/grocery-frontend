"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { AiFillCamera } from "react-icons/ai";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Input } from "@nextui-org/input";

type profileData = {
  name: string;
  email: string;
  password: string;
  picture: FileList;
  referralCode: string;
};

export const Profile: React.FC = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileData>({
    defaultValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "",
      referralCode: "4wB82jKQ",
    },
  });

  const DEFAULT_PICTURE = "https://avatar.iran.liara.run/public/18";

  const [profilePic, setProfilePic] = useState<string>(DEFAULT_PICTURE);
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (file) {
      if (!validTypes.includes(file.type)) {
        setFileError("Only jpg, png, jpeg, and gif files are allowed");
        return;
      }

      if (file.size > 1048576) {
        setFileError("File size must be less than 1 MB");
        return;
      }

      setFileError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: profileData) => {
    console.log(data);
  };

  return (
    <>
      <div className="relative max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
        <Button
          onPress={() => setFormDisabled(!formDisabled)}
          variant="light"
          className="absolute font-bold text-blue-600 top-1 right-3"
        >
          {formDisabled ? `Edit` : `Done`}
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative bg-gray-300 w-24 h-24  rounded-full overflow-hidden mb-4">
              {!formDisabled && (
                <label
                  htmlFor="profile-picture"
                  className="z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 absolute top-1/3 right-1/3 p-2 cursor-pointer"
                >
                  <AiFillCamera />
                </label>
              )}
              <Image
                src={profilePic}
                alt="profile-picture"
                className="z-0 w-full h-full object-cover"
              />
            </div>
            {fileError && <span className="text-red-500 text-xs">{fileError}</span>}
            <input
              disabled={formDisabled}
              {...register("picture")}
              id="profile-picture"
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>
          {/* Name */}
          <div>
            <Input
              {...register("name", { required: "Name is required" })}
              isRequired
              isDisabled={formDisabled}
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your name"
            />
          </div>
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          {/* Email */}
          <div>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
              })}
              isRequired
              isDisabled={formDisabled}
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          {/* Referral code */}
          <div>
            <Input
              {...register("referralCode")}
              isReadOnly
              type="text"
              label="Referral code"
              labelPlacement="outside"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              isRequired
              isDisabled={formDisabled}
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value),
                },
              })}
              type={showPassword ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute bottom-0 right-3 flex items-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <PiEyeBold className="h-5 w-5 text-gray-600" />
                  ) : (
                    <PiEyeClosedBold className="h-5 w-5 text-gray-600" />
                  )}
                </Button>
              }
            />
          </div>
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-xs">Password is required</span>
          )}
          {errors.password?.type === "checkLength" && (
            <span className="text-red-500 text-xs">
              Password should be at least 6 characters long
            </span>
          )}
          {errors.password?.type === "matchPattern" && (
            <span className="text-red-500 text-xs">
              Password should contain at least one uppercase letter, lowercase letter, digit, and
              special symbol.
            </span>
          )}

          {/* Submit Button */}
          <div>
            <Button
              isDisabled={!formDisabled}
              fullWidth
              className="bg-blue-500 text-white"
              type="submit"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
