import { api } from "./Axios";

export const About_API = {
    get_About_Company: async () => {
        const response = await api.get('/v4/company');
        return response.data;
    }
}