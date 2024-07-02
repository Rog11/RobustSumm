"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();

  const getButtonClass = (path: string) =>
    pathname === path
      ? "block w-full py-2 px-4 text-blue-600 font-semibold"
      : "block w-full py-2 px-4 text-gray-800 hover:text-blue-600 font-semibold";

  return (
    <div>
      <aside className="w-64 p-4  border-r border-gray-300">
        <nav>
          <ul>
            <li>
              <Link href="/docs" legacyBehavior>
                <button className={getButtonClass("/docs")}>Get Started</button>
              </Link>
            </li>
            <li>
              <Link href="/recipes" legacyBehavior>
                <button className={getButtonClass("/recipes")}>Recipes</button>
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" legacyBehavior>
                <button className={getButtonClass("/how-it-works")}>
                  How it works
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
