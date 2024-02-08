import { useAppDispatch } from "../../Store/Slices";
import { getSkillUser } from "../../Store/actions/projects.actions";

export const SkillImages = async () => {
  const dispatch = useAppDispatch();
  await dispatch(getSkillUser());
};
