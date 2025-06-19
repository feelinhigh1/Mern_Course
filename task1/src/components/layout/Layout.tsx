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
} from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

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
      icon: <FontAwesomeIcon icon={faProductHunt} />,
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

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-[5%]" : "w-[20%]"
        } bg-white shadow-md p-4 hidden md:flex flex-col relative transition-all duration-300`}
      >
        {/* Toggle Button */}
        {sidebarCollapsed ? (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="mb-6 flex justify-center text-gray-700"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        ) : (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="absolute top-4 right-4 text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        )}

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
                  if (isActive) {
                    e.preventDefault();
                  }
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-2 text-gray-700">
            <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
            <span>{user.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
