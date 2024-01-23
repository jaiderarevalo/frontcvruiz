import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../services/Api";
import { login, register } from "../../interfaces/interfac";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: register, { rejectWithValue }) => {
    console.log("los datos del user", user);

    try {
      const response = await Api.post("/auth/register", {
        email: user.email,
        name: user.name,
        password: user.password,
        confirmPassword: user.confirmPassword,
        role: user.role,
      });

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (user: login, { rejectWithValue }) => {
    console.log("los datos del user", user.id);

    try {
      const response = await Api.get(`/auth/${user.id}`);
      console.log("el usuario de get", response.data);

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user: login, { rejectWithValue }) => {
    console.log("los datos del user", user);

    try {
      const response = await Api.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);
console.log("soy response",response.data);

      return response.data;
    } catch (error) {
      console.log("Error", error);

      throw error; // relanzar error
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/validate-token", {
        token,
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
