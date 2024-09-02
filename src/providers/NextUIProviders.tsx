"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "sonner";

import { ChildType } from "@/shares/types";

export const Providers = ({ children }: ChildType) => (
  <NextUIProvider>
    {children}
    <Toaster richColors />
  </NextUIProvider>
);
