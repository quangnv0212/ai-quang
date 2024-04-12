"use client";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "@/constants/general.const";
import { TSidebarLink } from "@/types/general.types";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="px-4 py-6 bg-grayfc ">
      {sidebarLinks.map((link) => (
        <SidebarLink
          isActive={pathname === link.path}
          key={link.title}
          link={link}
        />
      ))}
    </div>
  );
};
interface ISidebarLinkProps {
  link: TSidebarLink;
  isActive: boolean;
}
function SidebarLink({ link, isActive }: ISidebarLinkProps) {
  return (
    <Link
      href={link.path}
      className={`flex items-center px-6 py-4 text-base font-bold gap-3 text-gray80 rounded-xl ${
        isActive ? "bg-primary text-white" : "hover:text-primary"
      }`}
    >
      <span>{link.icon}</span>
      <span>{link.title}</span>
    </Link>
  );
}

export default Sidebar;
