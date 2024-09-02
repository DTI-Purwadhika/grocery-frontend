import { Tooltip } from "@nextui-org/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";

import { capitalize } from "@/hooks/formatter";

import { ActionType } from "./type";

const Action = ({ title = "data" }: ActionType) => (
  <div className="flex flex-row justify-between text-lg">
    <Tooltip content={`${capitalize(title)} details`}>
      <Eye className="text-default-400 cursor-pointer active:opacity-50" />
    </Tooltip>
    <Tooltip content={`Edit ${title}`}>
      <Pencil className="text-default-400 cursor-pointer active:opacity-50" />
    </Tooltip>
    <Tooltip color="danger" content={`Delete ${title}`}>
      <Trash className="text-danger cursor-pointer active:opacity-50" />
    </Tooltip>
  </div>
);

export default Action;
