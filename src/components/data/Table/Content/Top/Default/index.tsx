import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { Link } from "@nextui-org/link";

import { PageSize, SearchBar } from "@/components/elements";
import { TitleType } from "@/shares/types";

import { ColumnType } from "../type";
import ColumnSelector from "../ColumnSelector";

const DefaultContent = ({ title = "data", columns }: TitleType & ColumnType) => {
  const topContent = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-8 items-end">
        <SearchBar title={title} />
        <div className="flex flex-row justify-end gap-4">
          <PageSize title={title} />
          <ColumnSelector columns={columns} />
          <Button
            as={Link}
            className={`bg-primary text-background ${title === "users" && "hidden"}`}
            endContent={<Plus />}
            href={`${title}/create`}
          >
            Add New
          </Button>
        </div>
      </div>
    ),
    [],
  );

  return topContent;
};

export default DefaultContent;
