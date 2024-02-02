import { Outlet } from "react-router-dom";
import github from "../images/github.png";

const LayoutPublic = () => {
  return (
    <div>
      <Outlet />
      <div className="text-center grid grid-cols-3 py-2 mb-10 bg-gray-900  shadow-gray-700 shadow-xl ">
        <div></div>
		<div>
          <p className=" text-white font-bold text-lg  ">
            Jaider Ruiz {new Date().getFullYear()}
          </p>
        </div>
        <div className=" flex px-10 justify-end">
          <a className="bg-white rounded-full" href="https://github.com/jaiderarevalo">
            <img className="h-8 w-8 text-white" alt="image gitHub" src={github} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LayoutPublic;
