import { api } from "./Axios";

export const Launches_API = {
    get_All_Launches: async () => {
        const response = await api.get('/v5/launches');
        return response.data;
    }
}