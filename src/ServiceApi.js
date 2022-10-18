import axios from "axios";
import {host, user_id, user_session_value} from './contexts/Global.js'

axios.defaults.baseURL = host;

class ServiceApi {
    post = async (params) => {
        return await axios.post(`api/${params.script}.php?${new URLSearchParams({
            action: params.action
        }).toString()}`, (params.data || null), {headers: {
            'x-user-id': user_id,
            'x-user-session-value': user_session_value,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }}).then((res) => {
           return res;
        }).catch((res) => {console.log(res);
            res.status = res.response.status;
            res.statusText = res.response.statusText;
            this.error(params.data || null, res.response.data);
            return res;
        });
    }

    error = (params, response) => {
        axios.post(`error.php`, {
            params: params,
            response: response
        }, {headers: {
            'user_id': user_id,
            'user_session_value': user_session_value,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
    }
}

const Api = new ServiceApi();

export default Api;