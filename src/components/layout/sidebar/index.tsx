"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import {
  Barcode,
  Blocks,
  ChartArea,
  Group,
  House,
  Percent,
  ReceiptText,
  Store,
  User,
} from "lucide-react";
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
              className={currentPath === "/dashboard" ? "bg-primary p-2 text-background" : ""}
              href="/dashboard"
              startContent={<House />}
            >
              Dashboard
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider title="Product">
            <ListboxItem
              key="/dashboard/categories"
              className={currentPath.includes("categories") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/categories"
              startContent={<Group />}
            >
              Product Category
            </ListboxItem>
            <ListboxItem
              key="/dashboard/products"
              className={currentPath.includes("products") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/products"
              startContent={<Barcode />}
            >
              Manage Product
            </ListboxItem>
            <ListboxItem
              key="/dashboard/inventories"
              className={
                currentPath.includes("inventories") ? "bg-primary p-2 text-background" : ""
              }
              href="/dashboard/inventories"
              startContent={<Blocks />}
            >
              Product Inventory
            </ListboxItem>
            <ListboxItem
              key="/dashboard/promotions"
              className={currentPath.includes("promotions") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/promotions"
              startContent={<Percent />}
            >
              Promotion
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Store">
            <ListboxItem
              key="/dashboard/admins"
              className={currentPath.includes("admins") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/admins"
              startContent={<User />}
            >
              Store Admin
            </ListboxItem>
            <ListboxItem
              key="/dashboard/stores"
              className={currentPath.includes("stores") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/stores"
              startContent={<Store />}
            >
              Store
            </ListboxItem>
            <ListboxItem
              key="/dashboard/orders"
              className={currentPath.includes("orders") ? "bg-primary p-2 text-background" : ""}
              href="/dashboard/orders"
              startContent={<ReceiptText />}
            >
              Order
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Management">
            <ListboxItem
              key="/dashboard/reports"
              className={currentPath.includes("reports") ? "bg-primary p-2 text-background" : ""}
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
