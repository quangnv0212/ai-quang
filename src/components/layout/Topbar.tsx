import { IconSearch } from "@/components/icons";
import Sidebar from "@/components/layout/Sidebar";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import IcLogout from "@/assets/images/ic_logout.svg";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="navbar bg-primary ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">AiBase</a>
      </div>
      <div className="flex-none gap-2">
        <div className="px-5 rounded-lg bg-grayf4 flex items-center gap-2  h-[38px]">
          <IconSearch />
          <input
            type="text"
            placeholder="Search"
            className="w-full font-normal bg-transparent outline-none text-primary placeholder:text-gray80"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-20 rounded-full">
              <div className="avatar">
                <div className="mask mask-hexagon">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnTWioCNB7npofuyc926l2c2L0hRPi6YsjQpMcJj-EA&s"
                  />
                </div>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] shadow menu menu-sm  dropdown-content bg-base-100 rounded-box w-52 border-[1px] "
          >
            <li>
              <a className="flex items-center text-16-20 hover:text-primary p-3">
                <UserOutlined />
                Profile
              </a>
            </li>
            <li>
              <a className="flex items-center text-16-20 hover:text-primary p-3">
                <SettingOutlined />
                Settings
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="flex items-center text-16-20 hover:text-primary p-3"
              >
                <Image className="w-4 h-4" src={IcLogout.src} alt="" />
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
