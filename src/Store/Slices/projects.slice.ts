import { createSlice } from "@reduxjs/toolkit";
import { handlePending } from "../actions/base.actions";
import {
  DeleteProjectUser,
  DeleteSkillUser,
  createProjectUser,
  createSkillUser,
  getProjectUser,
  getSkillUser,
  updateProjectUser,
} from "../actions/projects.actions";

export interface createProject {
  name: string;
  description: string;
  skills: string;
  repository: string | null;
  image: string | null;
}
export interface createSkill {
  id?: string;
  skill: string | null;
}

export interface projectState {
  isEdit:boolean
  skill: createSkill | null;
  project: createProject | null;
  isProject: boolean,
  loading: boolean;
  error: string | null;
}
const initialState: projectState = {
  isEdit:false,
  skill: null,
  project: null,
  isProject:false,
  loading: false,
  error: null,
};
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setIsEdit: (state, { payload }: any) => {
      console.log("soy el payload de login ", payload);
      state.isEdit = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProjectUser.pending, handlePending)
      .addCase(createProjectUser.fulfilled, (state, { payload }: any) => {
        state.project = payload.project;
      })
      .addCase(createProjectUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProjectUser.pending, handlePending)
      .addCase(getProjectUser.fulfilled, (state, { payload }: any) => {
        state.project = payload;
      })
      .addCase(getProjectUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createSkillUser.pending, handlePending)
      .addCase(createSkillUser.fulfilled, (state, { payload }: any) => {
        state.skill = payload.skill;
      })
      .addCase(createSkillUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSkillUser.pending, handlePending)
      .addCase(getSkillUser.fulfilled, (state, { payload }: any) => {
        state.skill = payload;
      })
      .addCase(getSkillUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteSkillUser.pending, handlePending)
      .addCase(DeleteSkillUser.fulfilled, (state, { payload }: any) => {
        state.skill = payload;
      })
      .addCase(DeleteSkillUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteProjectUser.pending, handlePending)
      .addCase(DeleteProjectUser.fulfilled, (state, { payload }: any) => {
        state.project = payload;
      })
      .addCase(DeleteProjectUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProjectUser.pending, handlePending)
      .addCase(updateProjectUser.fulfilled, (state, { payload }: any) => {
        state.project = payload;
      })
      .addCase(updateProjectUser.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default projectSlice.reducer;


export const { setIsEdit } = projectSlice.actions;