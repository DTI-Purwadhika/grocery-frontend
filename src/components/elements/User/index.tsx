"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useLogout";

import { ThemeButton } from "..";

const UserCard = () => {
  const { userProfile } = useProfile();
  const router = useRouter();
  const { logout } = useLogout();

  return (
    <>
      <div className="flex flex-row gap-4">
        <Card className="hidden md:flex">
          <CardBody className="flex flex-row gap-2">
            <ThemeButton />
            {/* <Notification /> */}
          </CardBody>
        </Card>
        <Dropdown>
          <DropdownTrigger>
            <Card className="cursor-pointer">
              <CardBody>
                <User
                  avatarProps={{
                    src: `
                    ${userProfile?.profilePicture}`,
                  }}
                  className="hidden md:flex md:flex-nowrap w-fit"
                  description={userProfile?.role}
                  name={userProfile?.name}
                />
                <User2 className="md:hidden" />
              </CardBody>
            </Card>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="dashboard" onPress={() => router.push("/dashboard")}>
              Dashboard
            </DropdownItem>
            <DropdownItem key="profile" onPress={() => router.push("/my-profile")}>
              Profile
            </DropdownItem>
            <DropdownItem key="logout" onPress={logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default UserCard;
