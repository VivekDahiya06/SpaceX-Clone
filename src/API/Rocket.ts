import { api } from "./Axios";

const Rockets_API = {
    get_All_Rockets: async () => {
        const response = await api.get('/v4/rockets');
        return response.data;
    }
}

export default Rockets_API;