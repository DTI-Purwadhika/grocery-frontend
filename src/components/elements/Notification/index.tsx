import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
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
        <DropdownMenu
          aria-label="notification"
          emptyContent={
            <div className="flex flex-col items-center py-8">
              <MessageSquareDashed /> No Notification
            </div>
          }
        >
          {[]}
        </DropdownMenu>
      </Dropdown>
    </Badge>
  );
};

export default Notification;
