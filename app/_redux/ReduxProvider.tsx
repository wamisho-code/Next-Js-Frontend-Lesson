// app/_redux/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { setCredentials } from "./authSlice";
import { decodeToken } from "../_utils/decodeToken";
import { useEffect } from "react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const user = decodeToken(token);

        if (user.exp * 1000 > Date.now()) {
          store.dispatch(
            setCredentials({
              token,
              user,
            })
          );
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch {
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  // Always render {children} so Next.js can validate instant navigation
  return <Provider store={store}>{children}</Provider>;
}
