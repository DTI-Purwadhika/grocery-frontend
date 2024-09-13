import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Badge } from "@nextui-org/badge";
import { Bell, MessageSquareDashed } from "lucide-react";

const Notification = () => {
  return (
    <Badge color="danger" content="5">
      <Dropdown>
        <DropdownTrigger>
          {/* <Tooltip content={`You have ${5} notification`} placement="bottom"> */}
          <Button isIconOnly variant="ghost">
            <Bell />
          </Button>
          {/* </Tooltip> */}
        </DropdownTrigger>
        <DropdownMenu aria-label="notification">
          <DropdownItem key="no-notif" startContent={<MessageSquareDashed />}>
            No Notification
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Badge>
  );
};

export default Notification;
