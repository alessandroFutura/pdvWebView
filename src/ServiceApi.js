import axios from "axios";
import {host, user_id, user_session_value} from './global.js'

axios.defaults.baseURL = host;

class ServiceApi {
    post = async (params) => {
        return await axios.post(`${params.script}.php?${new URLSearchParams({
            action: params.action,
            user_id: user_id,
            user_session_value: user_session_value
        }).toString()}`).catch((res) => {
            console.log(res);
        });
    }
}

const Api = new ServiceApi();

export default Api;