"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";

import { Datatable } from "@/components/data";
import { Admin, User } from "@/constants/field";

const AdminContainer = () => {
  const [selected, setSelected] = useState("users");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      variant="light"
      onSelectionChange={(value) => setSelected(value as string)}
    >
      <Tab key="users" title="Customer">
        <Datatable columns={User.columns} defaultCol={User.selected} title="users" />
      </Tab>
      <Tab key="admins" title="Admin">
        <Datatable columns={Admin.columns} defaultCol={Admin.selected} title="admins" />
      </Tab>
    </Tabs>
  );
};

export default AdminContainer;
