import { api } from './Axios';


const StarLink_API = {
    get_All_StarLink: async () => {
        const response = await api.get('/v4/starlink');
        return response.data;
    },

}

export default StarLink_API;