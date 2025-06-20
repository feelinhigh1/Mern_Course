import Link from "next/link";
import React, { JSX, useState } from "react";
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
  faRightFromBracket,
  faUser,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "md:w-64 w-16"
        } bg-cyan-700 text-white shadow-md p-4 flex flex-col relative transition-all duration-300`}
      >
        {/* Sidebar Header with Brand */}
        <div className="flex items-center justify-between mb-6">
          {/* Website name, visible on md+ */}
          {!sidebarCollapsed && (
            <Link href="/" className="hidden md:block text-xl font-bold">
              MyApp
            </Link>
          )}

          {/* Hamburger toggle, visible on md+ */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden md:block ${sidebarCollapsed ? "mx-auto" : ""}`}
          >
            <FontAwesomeIcon
              icon={sidebarCollapsed ? faBars : faXmark}
              className="text-xl cursor-pointer"
            />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col space-y-6 mt-4 w-full items-center">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 hover:text-yellow-300 ${
                  sidebarCollapsed
                    ? "justify-center"
                    : "justify-start w-full px-2"
                } ${
                  isActive ? "text-yellow-300 font-bold cursor-default" : ""
                }`}
                onClick={(e) => {
                  if (isActive) e.preventDefault();
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="hidden md:inline">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2 md:pl-8">
            <span className="text-xl font-bold">{title}</span>
          </div>

          <div className="relative flex items-center gap-3 pr-8">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-2xl text-gray-500"
              />
              <span className="font-semibold">{user.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border rounded-md shadow-md w-40 z-50">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    console.log("Logging out...");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Logout</span>
                </button>
              </div>
            )}
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
