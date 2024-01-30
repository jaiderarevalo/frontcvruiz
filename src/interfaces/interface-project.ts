import { Firestore } from "firebase/firestore";

export interface projectInterface {
  name: string;
  description: string;
  skills: string;
  image: string | null | undefined;
  repository: string | null;
}

export interface UpdateprojectInterface {
  id?:string | null
  name?: string;
  description?: string;
  skills?: string;
  image?: string | null | undefined;
  repository?: string | null;
}

export interface SkillInterface {
  skill: string | null;
}
