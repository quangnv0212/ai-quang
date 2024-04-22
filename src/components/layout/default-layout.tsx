"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import { decodeJWT } from "@/lib/utils";
import Logo from "@/assets/images/logo.png";
import avatar from "@/assets/images/ic_avatar.svg";

import {
  BankOutlined,
  CheckCircleOutlined,
  ControlOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import TopBar from "./Topbar";
import Image from "next/image";
import IcLogout from "@/assets/images/ic_logout.svg";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  accessToken: any;
}
const { Content, Sider } = Layout;

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, accessToken } = props;
  const queryClient = new QueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
    } else {
      setUser(decodeJWT(accessToken.value));
    }
  }, [accessToken]);

  const items: any[] = [
    {
      key: "/tenant-management",
      icon: <BankOutlined width={20} height={20} />,
      label: "Tenant",
      onClick: () => {
        router.push("/tenant-management");
      },
    },
    {
      key: "/account-management",
      icon: <UserOutlined />,
      label: "User",
      onClick: () => {
        router.push("/account-management");
      },
    },
    {
      key: "/roles-management",
      icon: <ControlOutlined />,
      label: "Role",
      onClick: () => {
        router.push("/roles-management");
      },
    },
    {
      key: "/user-activation",
      icon: <CheckCircleOutlined />,
      label: "User Activation",
      onClick: () => {
        router.push("/user-activation");
      },
    },
  ];
  let itemsFiltered = user?.permissions
    .map((x) => {
      switch (x) {
        case "Pages.Tenants":
          return items[0];
        case "Pages.Users":
          return items[1];
        case "Pages.Roles":
          return items[2];
        case "Pages.Users.Activation":
          return items[3];
        default:
          return null;
      }
    })
    .filter((x) => (x = true));
  itemsFiltered = [
    ...(itemsFiltered || []),
    {
      // key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          // key: "/logout",
          label: "Logout",
          icon: <LogoutOutlined />,
        },
        {
          key: "/change-password",
          label: "Change Password",
          icon: <EditOutlined />,
          onClick: () => {
            router.push("/change-password");
          },
        },
      ],
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <AppProvider user={user} inititalSessionToken={accessToken?.value}>
          <ToastContainer />
          {!accessToken ? (
            <>{children}</>
          ) : (
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                width={240}
                theme="light"
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className=" flex items-center justify-center">
                  <Image src={Logo} alt="" width={150} height={150} />
                </div>
                <Menu
                  theme="light"
                  selectedKeys={[pathName]}
                  mode="inline"
                  items={itemsFiltered}
                />
              </Sider>
              <Layout>
                <Content style={{ margin: "24px" }}>{children}</Content>
              </Layout>
            </Layout>
          )}
        </AppProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
