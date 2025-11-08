import axios from "axios";

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

const API_BASE_URL =
  "https://69086a582d902d0651b03223.mockapi.io/api/v1/places";

function isAxiosError(
  error: unknown
): error is { isAxiosError: boolean; response?: any } {
  return (error as any)?.isAxiosError === true;
}

export const attractionsAPI = {
  getAll: async (): Promise<Attraction[]> => {
    try {
      const response = await axios.get(API_BASE_URL);
      const data = response.data;

      if (!Array.isArray(data)) {
        throw new Error(
          "Format de données inattendu : attendu un tableau d'attractions."
        );
      }

      const attractions: Attraction[] = data.map((a: any) => {
        const imageUrl = a.images?.[0] || a.thumbnail;
        if (!imageUrl || typeof imageUrl !== "string") {
          throw new Error(`Attraction invalide (manque image): ${a.id}`);
        }

        return {
          id: String(a.id),
          name: String(a.name ?? ""),
          description: String(a.description ?? ""),
          image: imageUrl,
          createdAt: String(a.createdAt ?? new Date().toISOString()),
        };
      });

      return attractions;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log("Erreur Axios :", error.response?.data);
        throw new Error(
          error.response?.data?.message ||
            "Impossible de charger les attractions"
        );
      } else {
        console.log("Autre type d'erreur :", error);
        throw new Error("Une erreur est survenue");
      }
    }
  },
};
