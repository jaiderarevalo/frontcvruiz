import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Store/Slices";

const Protected = ({ children }: { children: ReactElement }) => {
  const { isLogin } = useSelector((root: RootState) => root.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate("/");
  }, [isLogin]);
  return <>{children}</>;
};

export default Protected;
