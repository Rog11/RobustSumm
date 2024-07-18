// components/DocsLayout.tsx
import React from "react";
import Link from "next/link";
import SideBar from "../SideBar";

type DocsLayoutProps = {
  children: React.ReactNode;
};

const RecipeLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default RecipeLayout;
