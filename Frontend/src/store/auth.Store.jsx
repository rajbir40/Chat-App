import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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
    }
}));
