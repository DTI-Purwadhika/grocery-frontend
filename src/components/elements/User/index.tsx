"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { User2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";

import { ThemeButton, Notification } from "..";
import { useLogout } from "@/hooks/useLogout";

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
            <Notification />
          </CardBody>
        </Card>
        <Dropdown>
          <DropdownTrigger>
            <Card className="cursor-pointer">
              <CardBody>
                <User
                  className="hidden md:flex md:flex-nowrap w-fit"
                  description={userProfile?.role}
                  name={userProfile?.name}
                  avatarProps={{
                    src: `
                    ${userProfile?.profilePicture}`,
                  }}
                />
                <User2 className="md:hidden" />
              </CardBody>
            </Card>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onPress={() => router.push("/dashboard")} key="dashboard">
              Dashboard
            </DropdownItem>
            <DropdownItem onPress={() => router.push("/my-profile")} key="profile">
              Profile
            </DropdownItem>
            <DropdownItem onPress={logout} key="logout">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default UserCard;
