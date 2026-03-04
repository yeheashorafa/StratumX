import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      theme: "system", // 'light', 'dark', or 'system'
      language: "en", // 'en' or 'ar'

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "en" ? "ar" : "en" })),
    }),
    {
      name: "stratumx-ui-storage",
    },
  ),
);
