"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();

  const getButtonClass = (path: string) =>
    pathname === path
      ? "btn btn-ghost btn-sm justify-start w-full text-primary"
      : "btn btn-ghost btn-sm justify-start w-full";

  return (
    <div>
      <aside className="w-64 p-4 border-r border-base-300">
        <nav>
          <ul>
            <li>
              <Link href="/docs" className={getButtonClass("/docs")}>
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="/perturbations"
                className={getButtonClass("/perturbations")}
              >
                Perturbations
              </Link>
            </li>
            {/* <li>
              <Link href="/dataset" legacyBehavior>
                <button className={getButtonClass("/dataset")}>
                  Attack Methodology
                </button>
              </Link>
            </li> */}
            <li>
              <Link
                href="/how-it-works"
                className={getButtonClass("/how-it-works")}
              >
                How it works
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
