import { api } from "./Axios";

export const Rockets_API = {
    get_All_Rockets: async () => {
        const response = await api.get('/rockets');
        return response.data;
    }
}