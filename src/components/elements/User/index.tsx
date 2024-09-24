"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { User2 } from "lucide-react";

import { ThemeButton, Notification } from "..";

const UserCard = () => (
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
              description="Admin Store"
              name="John Doe"
            />
            <User2 className="md:hidden" />
          </CardBody>
        </Card>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="dashboard">Dashboard</DropdownItem>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="logout">Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
);

export default UserCard;
