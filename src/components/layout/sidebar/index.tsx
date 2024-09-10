"use client";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { Card, CardBody } from "@nextui-org/card";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Barcode, Blocks, ChartArea, Group, House, Store, User } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const { getLastSegment } = useCurrentPath();
  const [selectedKeys, setSelectedKeys] = useState(new Set([getLastSegment() || "dashboard"]));

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
              key="dashboard"
              href="/dashboard"
              startContent={<House />}
              className={getLastSegment() === "dashboard" ? "bg-default-300" : ""}
            >
              Dashboard
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider title="Product">
            <ListboxItem
              key="products"
              href="/dashboard/products"
              startContent={<Barcode />}
              className={getLastSegment() === "products" ? "bg-default-300" : ""}
            >
              Manage Product
            </ListboxItem>
            <ListboxItem
              key="categories"
              href="/dashboard/categories"
              startContent={<Group />}
              className={getLastSegment() === "categories" ? "bg-default-300" : ""}
            >
              Product Category
            </ListboxItem>
            <ListboxItem
              key="inventories"
              href="/dashboard/inventories"
              startContent={<Blocks />}
              className={getLastSegment() === "inventories" ? "bg-default-300" : ""}
            >
              Product Inventory
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Staff">
            <ListboxItem
              key="admins"
              href="/dashboard/admins"
              startContent={<User />}
              className={getLastSegment() === "admins" ? "bg-default-300" : ""}
            >
              Store Admin
            </ListboxItem>
            <ListboxItem
              key="stores"
              href="/dashboard/stores"
              startContent={<Store />}
              className={getLastSegment() === "stores" ? "bg-default-300" : ""}
            >
              Store
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Management">
            <ListboxItem
              key="reports"
              href="/dashboard/reports"
              startContent={<ChartArea />}
              className={getLastSegment() === "reports" ? "bg-default-300" : ""}
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
