import React, { useEffect } from "react";
import { useAppDispatch } from "../Store/Slices";
import { verifyToken } from "../Store/actions/auth.actions";
import { setLogin } from "../Store/Slices/auth.slice";

type Props = {
  children: React.ReactElement;
};

const AuthVerify = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    dispatch(verifyToken(token as any)).then((response) => {
      if (response.type === "auth/verifyToken/fulfilled") {
        dispatch(setLogin(response.payload));
      }
    });
  }, []);

  return <>{children}</>;
};

export default AuthVerify;
