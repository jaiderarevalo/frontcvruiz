import React, { useEffect } from "react";
import { useAppDispatch } from "@/Store/Slices";
import { setLogin } from "@/Store/Slices/auth.slice";
import { validateToken } from "@/Store/actions/auth.actions";

type Props = {
  children: React.ReactElement;
};

const AuthVerify = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    dispatch(validateToken(token as any)).then((response) => {
      if (response.type === "auth/validateToken/fulfilled") {
        dispatch(setLogin(response.payload));
      }
    });
  }, []);

  return <>{children}</>;
};

export default AuthVerify;
