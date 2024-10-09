import React from "react";

export type ChildType = {
  children: React.ReactNode;
};

export type FormType = {
  type: "create" | "update";
  id?: number | string;
};

export type idType = {
  params: {
    id: number | string;
  };
};

export type TitleType = {
  title: string;
};
