"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import Logo from "@/assets/images/logo.png";
import { decodeJWT } from "@/lib/utils";

import authApiRequest from "@/apiRequests/auth";
import {
  BankOutlined,
  CheckCircleOutlined,
  ControlOutlined,
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  accessToken: any;
}
const { Content, Sider } = Layout;

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, accessToken } = props;
  const queryClient = new QueryClient();
  const pathName = usePathname();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const logout = async () => {
    await authApiRequest.logoutFromNextClientToNextServer();
    router.push("/");
    router.refresh();
  };
  useEffect(() => {
    if (!accessToken?.value) {
      setUser(null);
    } else {
      setUser(decodeJWT(accessToken.value));
    }
  }, [accessToken]);
  const items: any[] = [
    {
      key: "/tenant-management",
      icon: <BankOutlined width={20} height={20} />,
      label: "Company",
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
  ];
  let itemsFiltered = user?.permissions
    ?.map((x) => {
      switch (x) {
        case "Pages.Tenants":
          return items[0];
        case "Pages.Users":
          return items[1];
        case "Pages.Roles":
          return items[2];
        default:
          return null;
      }
    })
    .filter((x) => (x = true));
  itemsFiltered = [
    {
      key: "/",
      icon: <DashboardOutlined width={20} height={20} />,
      label: "Dashboard",
      onClick: () => {
        router.push("/");
      },
    },
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
          onClick: () => {
            logout();
          },
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
