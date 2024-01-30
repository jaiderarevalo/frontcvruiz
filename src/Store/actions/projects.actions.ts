import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProject, createSkill } from "../Slices/projects.slice";
import { Api } from "../../services/Api";
import { UpdateprojectInterface } from "../../interfaces/interface-project";

export const createProjectUser = createAsyncThunk(
  "project/projectUser",
  async (project: createProject, { rejectWithValue }) => {
    console.log("los datos del project", project);

    try {
      const response = await Api.post("/project/create", {
        name: project.name,
        description: project.description,
        skills: project.skills,
        repository: project.repository,
        image: project.image,
      });

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const createSkillUser = createAsyncThunk(
  "project/createSkillUser",
  async (projectSkill: createSkill, { rejectWithValue }) => {
    console.log("los datos del Skill", projectSkill);

    try {
      const response = await Api.post("/skills/create", {
        skill: projectSkill.skill,
      });

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);

export const getProjectUser = createAsyncThunk(
  "project/getProjectUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/project");
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);

export const getSkillUser = createAsyncThunk(
  "project/getSkillUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/skills");
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const DeleteSkillUser = createAsyncThunk(
  "project/deleteSkillUser",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("el id que llega ", id);

      const response = await Api.delete(`/skills/${id}`);
      return response;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const DeleteProjectUser = createAsyncThunk(
  "project/deleteProjectUser",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("el id que llega ", id);

      const response = await Api.delete(`/project/${id}`);
      return response;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const getOneProjectUser = createAsyncThunk(
  "project/getOneProjectUser",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("el id que llega ", id);

      const response = await Api.get(`/project/${id}`);
      console.log("soy el response",response);
      
      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const updateProjectUser = createAsyncThunk(
  "project/updateProjectUser",
  async (
    {  body }: {body: UpdateprojectInterface },
    { rejectWithValue }
  ) => {
    try {
      console.log("body del mismo patch",body);
      
      const response = await Api.patch(`/project/${body.id}`, {
        name: body.name,
        description: body.description,
        skills: body.skills,
        image: body.image,
        repository: body.repository,
      });
      console.log("soy el response del action patch", response.data);
      
      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
