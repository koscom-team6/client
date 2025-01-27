import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));

export default useAuthStore;
