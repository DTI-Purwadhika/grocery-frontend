"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";

import { UserCard } from "@/components/elements";

import Sidebar from "../../sidebar";

const index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent as="div" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Grocery APP</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <UserCard />
      </NavbarContent>
      <NavbarMenu className="pt-8">
        <Sidebar />
      </NavbarMenu>
    </Navbar>
  );
};

export default index;
