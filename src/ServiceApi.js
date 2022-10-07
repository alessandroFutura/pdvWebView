import axios from "axios";
import {host, user_id, user_session_value} from './contexts/Global.js'

axios.defaults.baseURL = host;

class ServiceApi {
    post = async (params) => {
        return await axios.post(`api/${params.script}.php?${new URLSearchParams({
            action: params.action,
            user_id: user_id,
            user_session_value: user_session_value
        }).toString()}`, (params.data || null), {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then((res) => {
           return res;
        }).catch((res) => {
            res.status = res.response.status;
            res.statusText = res.response.statusText;
            this.error(params.data || null, res.response.data);
            return res;
        });
    }

    error = (params, response) => {
        axios.post(`error.php?${new URLSearchParams({
            user_id: user_id,
            user_session_value: user_session_value
        }).toString()}`, {
            params: params,
            response: response
        }, {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
    }
}

const Api = new ServiceApi();

export default Api;