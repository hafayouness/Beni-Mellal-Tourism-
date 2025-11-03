import axios from "axios";

const api = axios.create({
  baseURL: "https://69086a582d902d0651b03223.mockapi.io/api/v1/places",
  timeout: 5000,
});

export const fetchAttractions = async () => {
  try {
    const response = await api.get("/attractions");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des attractions :", error);
    throw error;
  }
};
