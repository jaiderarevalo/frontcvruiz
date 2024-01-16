import { typeProject } from "../interfaces/interfac";
import { instance } from "./axios";
export const postProject = (data: typeProject, image: File) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("image", image);

  return instance.post("/project", formData);
};

export const deleteProject = (id: number) => instance.delete(`/project/${id}`);
export const getProject = () => instance.get("/project");
