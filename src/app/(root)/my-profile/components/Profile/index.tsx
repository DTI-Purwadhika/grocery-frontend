"use client";
import { getCookie } from "cookies-next";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { IoCamera } from "react-icons/io5";
import { Chip } from "@nextui-org/chip";
import { MdVerifiedUser } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";

type profileData = {
  name: string | undefined;
  email: string | undefined;
  password: string;
  picture: FileList;
  referralCode: string | undefined;
};

export const Profile: React.FC = () => {
  const DEFAULT_PICTURE = "https://avatar.iran.liara.run/public/18";
  const cookieValue = getCookie("Sid");
  const { data: session } = useSession();
  const [profilePic, setProfilePic] = useState<string>(DEFAULT_PICTURE);
  const [pictureFile, setPictureFile] = useState<File>();
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");
  const { userProfile } = useProfile();

  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      referralCode: "",
    },
  });

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

      setPictureFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: profileData) => {
    try {
      const formData = new FormData();
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.email) {
        formData.append("email", data.email);
      }
      if (data.password) {
        formData.append("password", data.password);
      }
      if (pictureFile) {
        formData.append("profilePicture", pictureFile);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/update`, {
        method: "PUT",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${cookieValue}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    setValue("name", userProfile?.name);
    setValue("email", userProfile?.email);
    setValue("referralCode", userProfile?.referralCode);
    // @ts-ignore
    if (session.provider === "google") {
      // @ts-ignore
      setProfilePic(session?.user?.picture);
    }
  }, [userProfile, setValue]);

  return (
    <>
      <div className="relative max-w-md mx-auto p-4 bg-gray-50 shadow-lg rounded-lg">
        <div className="absolute flex items-center gap-1 top-8 left-8 ">
          {userProfile?.isVerified ? (
            <Chip size="sm" color="primary" startContent={<MdVerifiedUser />}>
              <span className="font-bold">Verified</span>
            </Chip>
          ) : (
            <>
              <Chip size="sm" color="warning" startContent={<IoIosWarning />}>
                <span className="font-bold">Not Verified</span>
              </Chip>
              <Popover color="warning" placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <button type="button">
                    <RxQuestionMarkCircled />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-1">
                    <p className="text-xs font-bold">
                      Your account has not been verified and therefore unable to create orders.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        <Button
          onPress={() => setFormDisabled(!formDisabled)}
          variant="light"
          className="absolute font-bold text-green-600 top-1 right-3"
        >
          {formDisabled ? `Edit` : `Done`}
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {!formDisabled && (
                <label
                  htmlFor="profile-picture"
                  className="z-10 opacity-0 hover:opacity-100 transition-opacity duration-200 absolute top-7 right-8 p-2 cursor-pointer"
                >
                  <IoCamera className="w-5 h-5" />
                </label>
              )}
              <Avatar isBordered src={profilePic} className="w-24 h-24 text-large z-0" />
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
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  isDisabled={formDisabled}
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  className="font-bold"
                />
              )}
            />
          </div>
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          {/* Email */}
          <div>
            <Controller
              name="email"
              control={control}
              rules={{
                // required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  // @ts-ignore
                  isDisabled={formDisabled || session.provider === "google"}
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  className="font-bold"
                />
              )}
            />
          </div>
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          {/* Referral code */}

          {userProfile?.role === "CUSTOMER" && (
            <div>
              <Input
                {...register("referralCode")}
                isReadOnly
                type="text"
                label="Referral code"
                labelPlacement="outside"
                className="font-bold"
                placeholder="Referral"
              />
            </div>
          )}

          {/* Password */}

          {
            // @ts-ignore
            session?.provider !== "google" && (
              <div className="relative">
                <Input
                  className="font-bold"
                  isDisabled={formDisabled}
                  {...register("password", {
                    validate: {
                      checkLength: (value) => value.length == 0 || value.length >= 6,
                      matchPattern: (value) =>
                        value.length == 0 ||
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
            )
          }

          {errors.password?.type === "checkLength" && (
            <span className="text-red-500 text-sm">
              Password should be at least 6 characters long
            </span>
          )}
          {errors.password?.type === "matchPattern" && (
            <span className="text-red-500 text-sm">
              Password should contain at least one uppercase letter, lowercase letter, digit, and
              special symbol.
            </span>
          )}

          {/* Submit Button */}
          <div>
            <Button
              isDisabled={!formDisabled}
              fullWidth
              color="primary"
              className="font-bold text-white"
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
