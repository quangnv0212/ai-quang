"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import Logo from "@/assets/images/logo.png";
import { decodeJWT } from "@/lib/utils";
import authApiRequest from "@/apiRequests/auth";
import {
  BankOutlined,
  DashboardOutlined,
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

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
  const userRole =
    user &&
    user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const itemsAdmin: any[] = [
    {
      key: "/",
      icon: <DashboardOutlined width={20} height={20} />,
      label: "Dashboard",
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: "/tenant-management",
      icon: <BankOutlined width={20} height={20} />,
      label: "Companies",
      onClick: () => {
        router.push("/tenant-management");
      },
    },
    {
      key: "/account-management",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => {
        router.push("/account-management");
      },
    },
    {
      key: "/model-management",
      icon: <ThunderboltOutlined />,
      label: "Models",
      onClick: () => {
        router.push("/model-management");
      },
    },
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
  const itemsSystemAdmin: any[] = [
    {
      key: "/",
      icon: <DashboardOutlined width={20} height={20} />,
      label: "Dashboard",
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: "/account-management",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => {
        router.push("/account-management");
      },
    },
    {
      key: "/model-management",
      icon: <ThunderboltOutlined />,
      label: "Models",
      onClick: () => {
        router.push("/model-management");
      },
    },
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
  const itemsUser: any[] = [
    {
      key: "/",
      icon: <DashboardOutlined width={20} height={20} />,
      label: "Dashboard",
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: "/model-management",
      icon: <ThunderboltOutlined />,
      label: "Models",
      onClick: () => {
        router.push("/model-management");
      },
    },
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
                <div className=" flex items-center justify-center flex-col">
                  <div className="w-3 h-3"></div>
                  <Image src={Logo} alt="" width={300} height={300} />
                  <div className="w-2 h-2"></div>
                </div>
                <Menu
                  theme="light"
                  selectedKeys={[pathName]}
                  mode="inline"
                  items={
                    userRole === "Admin"
                      ? itemsAdmin
                      : userRole === "Company"
                      ? itemsSystemAdmin
                      : itemsUser
                  }
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
