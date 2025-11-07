import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { attractionsAPI } from "../service/app";

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

interface AttractionsState {
  attractions: Attraction[];
  loading: boolean;
  error: string | null;
  fetchAttractions: () => Promise<void>;
}

export const useAttractionsStore = create<AttractionsState>()(
  persist(
    (set) => ({
      attractions: [],
      loading: false,
      error: null,

      fetchAttractions: async () => {
        set({ loading: true, error: null });
        try {
          const data = await attractionsAPI.getAll();
          set({ attractions: data, loading: false });
        } catch (err: any) {
          set({
            error: err.message || "Impossible de charger les attractions",
            loading: false,
          });
        }
      },
    }),
    {
      name: "attractions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
