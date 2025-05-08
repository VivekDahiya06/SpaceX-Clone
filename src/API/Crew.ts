import { api } from "./Axios";

const Crew_API = {
    
    get_Crew_By_Name: async (name: string) => {
        const response = await api.post(`/v4/crew/query`, {
            name
        });
        return response.data;
    },
    get_Crew_By_Status: async (status: string) => {
        const response = await api.post(`/v4/crew/query`);
        return response.data;
    },

}

export default Crew_API;