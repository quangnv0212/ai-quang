"use client";
import authApiRequest from "@/apiRequests/auth";
import IcLogout from "@/assets/images/ic_logout.svg";
import { IconSearch } from "@/components/icons";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const logout = async () => {
    await authApiRequest.logoutFromNextClientToNextServer();
    router.push("/");
    router.refresh();
  };
  return (
    <div className="navbar bg-primary ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">AiBase</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-20 rounded-full">
              <div className="avatar">
                <div className="mask mask-hexagon">
                  <Image
                    width={160}
                    height={160}
                    alt="Tailwind CSS Navbar component"
                    src="https://vcdn-giaitri.vnecdn.net/2013/12/07/John-Lennon-7519-1386386749.jpg"
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
              <button
                onClick={logout}
                className="flex items-center text-16-20 hover:text-primary p-3"
              >
                <Image
                  className="w-4 h-4"
                  src={IcLogout.src}
                  alt=""
                  width={200}
                  height={200}
                />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
