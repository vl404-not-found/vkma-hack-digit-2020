import axios from "axios";
import {ApiBaseURL} from "../../utils/consts";
import qs from "qs";

export const request = (data) => {
    console.log('data_ta', data)
    let config = {
        method: 'get',
        url: `${ApiBaseURL}?${qs.stringify({...data})}`,
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data);
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

