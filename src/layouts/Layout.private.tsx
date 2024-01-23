import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Main from "../containers/Main";
import ThemedSuspense from "../toggle/ThemedSuspense";

const LayoutPrivate = () => {
  return (
    <div>
      <div className="flex flex-col flex-1 w-full">
        <Main>
          <div className="pt-10">
            <Suspense fallback={<ThemedSuspense />}>
              <Outlet />
            </Suspense>
          </div>
        </Main>
      </div>
    </div>
  );
};

export default LayoutPrivate;
