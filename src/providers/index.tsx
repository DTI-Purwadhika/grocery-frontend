"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ChildType } from "@/shares/types";

const queryClient = new QueryClient();

export const Providers = ({ children }: ChildType) => (
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
      <Toaster richColors />
    </QueryClientProvider>
  </NextUIProvider>
);
