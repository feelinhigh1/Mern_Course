import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faGauge,
  faUsers,
  faGear,
  faCircleUser,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  user?: {
    name: string;
    avatarUrl?: string;
  };
  navItems?: SidebarItem[];
}

export default function Layout({
  children,
  title,
  user = { name: "Admin", avatarUrl: "" },
  navItems = [
    { name: "Dashboard", path: "/", icon: <FontAwesomeIcon icon={faGauge} /> },
    { name: "Users", path: "/users", icon: <FontAwesomeIcon icon={faUsers} /> },
    {
      name: "Products",
      path: "/products",
      icon: <FontAwesomeIcon icon={faBox} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FontAwesomeIcon icon={faGear} />,
    },
  ],
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const router = useRouter();

  // Determine sidebar width based on route and collapsed state
  const isUsersPage = router.pathname === "/users";
  const expandedWidth = isUsersPage
    ? "w-[20%] min-w-[200px]"
    : "w-[25%] min-w-[220px]";
  const collapsedWidth = "w-[5%] min-w-[60px]";

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? collapsedWidth : expandedWidth
        } bg-white shadow-md p-4 hidden md:flex flex-col relative transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`mb-6 flex justify-center text-gray-700 ${
            sidebarCollapsed ? "" : "absolute top-4 right-4"
          }`}
        >
          <FontAwesomeIcon
            icon={sidebarCollapsed ? faBars : faXmark}
            className="text-xl"
          />
        </button>

        {/* Title */}
        {!sidebarCollapsed && (
          <h2 className="text-2xl font-bold mb-6 mt-10">Admin Panel</h2>
        )}

        {/* Nav Items */}
        <nav className="flex flex-col space-y-6 mt-4 w-full items-center">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 hover:text-blue-600 ${
                  sidebarCollapsed
                    ? "justify-center"
                    : "justify-start w-full px-2"
                } ${isActive ? "text-blue-700 font-bold cursor-default" : ""}`}
                onClick={(e) => {
                  if (isActive) e.preventDefault();
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-2xl text-gray-500"
            />
            <span className="font-semibold">{user.name}</span>
          </div>
        </header>
        {/* Page Content */}
        <section className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </section>
      </main>
    </div>
  );
}
