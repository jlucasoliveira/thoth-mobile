import React from "react";
import { useStorageState } from "@/hooks";

type AuthContextValues = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextValues>({
  isLoading: true,
  isAuthenticated: false,
});

export function useAuth(): AuthContextValues {
  const values = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production" && values?.isLoading === undefined)
    throw new Error("useAuth must be wrapped in a <AuthProvider />");

  return values;
}

export default function AuthProvider(props: React.PropsWithChildren<object>): React.JSX.Element {
  const isAuthenticated = false;
  const [[isLoading]] = useStorageState("userToken");

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}
