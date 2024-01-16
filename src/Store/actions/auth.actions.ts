import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../services/Api";



export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user: UserRegister, { rejectWithValue }) => {
      try {
        const response = await Api.post("/auth/register", {
          email: user.email,
          name: user.name,
          password: user.password,
          confirmPassword: user.confirmPassword,
        });
        
  
        return response.data;
      } catch (error ) {
        console.log("Error", error.response.data.message.email[0]);
  
        throw error; // relanzar error
      }
    }
  );