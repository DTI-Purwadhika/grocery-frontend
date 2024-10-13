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
import { RxQuestionMarkCircled } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useLogout";

type profileData = {
  name: string | undefined;
  email: string | undefined;
  password: string;
  picture: FileList;
  referralCode: string | undefined;
};

export const Profile: React.FC = () => {
  const cookieValue = getCookie("Sid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const [pictureFile, setPictureFile] = useState<File>();
  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userProfile } = useProfile();
  const { logout } = useLogout();

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
      setIsLoading(true);
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/update`, {
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

      setIsLoading(false);

      const result = await response.json();

      if (
        result.data.error === "This email has been registered. Please update to a different email"
      ) {
        throw new Error("This email has been registered. Please update to a different email");
      }

      if (result.data.email !== session?.user?.email) {
        toast.success(
          "Profile updated successfully. Please verify your new email and login again.",
          {
            position: "top-center",
            duration: 5000,
          },
        );
        setTimeout(() => {
          logout();
        }, 5000);
      } else {
        toast.success("Profile updated successfully", {
          position: "top-center",
        });
      }
    } catch (error: any) {
      console.error(error.message);
      if (error.message === "Failed to update profile") {
        toast.error("Failed to update profile", {
          position: "top-center",
        });
      } else if (
        error.message === "This email has been registered. Please update to a different email"
      ) {
        toast.error("Email has been registered", {
          position: "top-center",
          description: "This email has been registered. Please update to a different email",
        });
      }
    }
  };

  const deleteProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users?email=${userProfile?.email}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${cookieValue}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      toast.error("Profile deleted", { position: "top-center", duration: 3000 });
      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("name", userProfile?.name);
    setValue("email", userProfile?.email);
    setValue("referralCode", userProfile?.referralCode);
    // @ts-ignore
    if (session?.provider === "google") {
      if (!userProfile?.profilePicture) {
        // @ts-ignore
        setProfilePic(session?.user?.picture);
      } else {
        setProfilePic(userProfile?.profilePicture);
      }
    } else {
      setProfilePic(userProfile?.profilePicture);
    }
  }, [userProfile, setValue]);

  return (
    <>
      <div className="relative max-w-md mx-auto p-4 bg-gray-50 shadow-lg rounded-lg">
        {userProfile?.role === "CUSTOMER" && (
          <div className="absolute flex flex-col lg:flex-row items-center gap-1 top-8 left-3 lg:left-8 ">
            <Chip size="sm" color="primary" startContent={<MdVerifiedUser />}>
              <span className="font-bold">Verified</span>
            </Chip>
            <Popover color="primary" placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <button type="button">
                  <RxQuestionMarkCircled />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-1">
                  <p className="text-xs font-bold">
                    Your account is verified and you&apos;re ready to create orders.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

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
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  // @ts-ignore
                  isReadOnly={session?.provider === "google"}
                  isDisabled={formDisabled}
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
              <div>
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
              {isLoading ? "Loading..." : "Update Profile"}
            </Button>
          </div>
          {/* Delete Profile Button */}
          <div>
            <Button
              isDisabled={!formDisabled}
              onPress={onOpen}
              className="font-bold bg-red-600 text-white"
              type="button"
            >
              Delete Profile
            </Button>
          </div>
        </form>
        <Modal
          backdrop="blur"
          className="w-2/3 lg:w-max"
          classNames={{
            base: "bg-gray-50",
            closeButton: "hover:bg-red-500 transition duration-300 text-black",
          }}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          placement="center"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent className="text-black">
            {() => (
              <>
                <ModalHeader className="flex gap-1 lg:gap-2 items-center justify-center text-2xl font-bold">
                  <IoIosWarning className="text-yellow-500 w-8 h-8" />
                  Warning!
                </ModalHeader>
                <ModalBody className="flex items-center">
                  <p className="font-semibold text-center text-sm lg:text-medium">
                    Are you sure you want to delete your profile? This action can&apos;t be undone!
                  </p>
                  <Button
                    type="button"
                    onPress={deleteProfile}
                    className="w-2/3 lg:w-1/2 font-bold bg-red-600 text-white"
                  >
                    Delete Profile
                  </Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
