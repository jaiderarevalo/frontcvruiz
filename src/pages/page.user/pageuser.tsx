import { useSelector } from "react-redux";
import Header from "../all-pages/Header";
import Proyects from "../all-pages/Proyects";
import { RootState } from "../../Store/Slices";
import Skills from "../all-pages/Skills";
const Pageuser = () => {
  const { user } = useSelector((root: RootState) => root.auth);
  return (
    <div>
      {user?.role === "admin" ? (
        <div>
          <Header /> <Proyects /> <Skills/>
        </div>
      ) : (
        <div>
          <Header /> <Proyects /> <Skills/>
        </div>
      )}
    </div>
  );
};

export default Pageuser;
