"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Barcode, Blocks, ChartArea, Group, House, Store, User } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["product"]));

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
            <ListboxItem key="dashboard" href="/dashboard" startContent={<House />}>
              Dashboard
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider title="Product">
            <ListboxItem key="product" href="/dashboard/products" startContent={<Barcode />}>
              Manage Product
            </ListboxItem>
            <ListboxItem key="category" href="/dashboard/categories" startContent={<Group />}>
              Product Category
            </ListboxItem>
            <ListboxItem key="inventory" href="/dashboard/inventories" startContent={<Blocks />}>
              Product Inventory
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Staff">
            <ListboxItem key="store-admin" href="/dashboard/admins" startContent={<User />}>
              Store Admin
            </ListboxItem>
            <ListboxItem key="store" startContent={<Store />}>
              Store
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Management">
            <ListboxItem key="Report" href="/dashboard/report" startContent={<ChartArea />}>
              Report
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
