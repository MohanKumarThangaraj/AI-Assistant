import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // FastAPI backend URL

export const fetchBackendData = async (): Promise<{ message: string } | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
