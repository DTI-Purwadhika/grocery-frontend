"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";

import { ThemeButton, Notification } from "..";

const UserCard = () => (
  <div className="flex flex-row gap-4">
    <Card>
      <CardBody className="flex flex-row gap-2">
        <ThemeButton />
        <Notification />
      </CardBody>
    </Card>
    <Dropdown>
      <DropdownTrigger>
        <Card className="cursor-pointer">
          <CardBody>
            <User description="Admin Store" name="John Doe" />
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
