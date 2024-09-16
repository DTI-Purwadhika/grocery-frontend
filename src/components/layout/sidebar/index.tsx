"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Barcode, Blocks, ChartArea, Group, House, Store, User } from "lucide-react";
import { useState } from "react";

import { useCurrentPath } from "@/hooks/useCurrentPath";

const Sidebar = () => {
  const { currentPath } = useCurrentPath();
  const [selectedKeys, setSelectedKeys] = useState(new Set([currentPath || "dashboard"]));

  const handleSelectionChange = (value: string | Set<string>) => {
    if (typeof value === "string") {
      setSelectedKeys(new Set([value]));
    } else {
      setSelectedKeys(value);
    }
  };

  return (
    <Card>
      <CardBody>
        <Listbox
          disallowEmptySelection
          aria-label="Data"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="flat"
          onSelectionChange={(value) => handleSelectionChange(value as string)}
        >
          <ListboxSection showDivider>
            <ListboxItem
              key="/dashboard"
              className={currentPath.includes("dashboard") ? "bg-default-300" : ""}
              href="/dashboard"
              startContent={<House />}
            >
              Dashboard
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider title="Product">
            <ListboxItem
              key="/dashboard/products"
              className={currentPath.includes("products") ? "bg-default-300" : ""}
              href="/dashboard/products"
              startContent={<Barcode />}
            >
              Manage Product
            </ListboxItem>
            <ListboxItem
              key="/dashboard/categories"
              className={currentPath.includes("categories") ? "bg-default-300" : ""}
              href="/dashboard/categories"
              startContent={<Group />}
            >
              Product Category
            </ListboxItem>
            <ListboxItem
              key="/dashboard/inventories"
              className={currentPath.includes("inventories") ? "bg-default-300" : ""}
              href="/dashboard/inventories"
              startContent={<Blocks />}
            >
              Product Inventory
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Staff">
            <ListboxItem
              key="/dashboard/admins"
              className={currentPath.includes("admins") ? "bg-default-300" : ""}
              href="/dashboard/admins"
              startContent={<User />}
            >
              Store Admin
            </ListboxItem>
            <ListboxItem
              key="/dashboard/stores"
              className={currentPath.includes("stores") ? "bg-default-300" : ""}
              href="/dashboard/stores"
              startContent={<Store />}
            >
              Store
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Management">
            <ListboxItem
              key="/dashboard/reports"
              className={currentPath.includes("reports") ? "bg-default-300" : ""}
              href="/dashboard/reports"
              startContent={<ChartArea />}
            >
              Report
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
