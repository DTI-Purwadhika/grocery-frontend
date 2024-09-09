"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { Bell, MessageSquareDashed } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { Tooltip } from "@nextui-org/tooltip";

import ThemeButton from "../ThemeButton";

const UserCard = () => (
  <div className="flex flex-row gap-4">
    <Card>
      <CardBody className="flex flex-row gap-2">
        <ThemeButton />
        <Badge color="danger" content="5">
          <Dropdown>
            <DropdownTrigger>
              <Tooltip content={`You have ${5} notification`} placement="bottom">
                <Button isIconOnly variant="ghost">
                  <Bell />
                </Button>
              </Tooltip>
            </DropdownTrigger>
            <DropdownMenu aria-label="notification">
              <DropdownItem key="no-notif" startContent={<MessageSquareDashed />}>
                No Notification
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Badge>
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
