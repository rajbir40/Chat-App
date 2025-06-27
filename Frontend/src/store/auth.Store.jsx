import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const authStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningIn: false,
    isUpdating: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data, isCheckingAuth: false });
        } catch (error) {
            console.error("Error in checkAuth:", error.message);
            set({ isCheckingAuth: false }); // Ensure state updates even on error
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          alert("Signup Successfull");
          toast.success("Account created successfully");
        } catch (error) {//.
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          alert("Login successfull");
          toast.success("Logged in successfully");
    
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

}));
