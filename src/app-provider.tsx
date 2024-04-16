"use client";
import { createContext, useContext, useState } from "react";
import { clientSessionToken } from "./lib/http";
import { User } from "./app/layout";

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
export default function AppProvider({
  children,
  inititalSessionToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
  user: User | null;
}) {
  const [user, setUser] = useState<User | null>(userProp);

  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
    }
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
