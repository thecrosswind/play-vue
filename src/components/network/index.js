

import axios from 'axios'
import _ from 'underscore'
import apis from './apis'

const hostName = 'https://music-api-ashy.vercel.app/'

let axiosInstance = axios.create({
    baseURL: hostName,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});

// axios.defaults.baseURL = 'http://localhost:3000/'
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // console.log('haha ,请求被我拦截到了把', config)
        // config.headers.aa = 'bb'
        // config.baseURL = 'http://localhost:8888/api/private/v1/'

        // config.headers['X-Real-IP'] = '211.161.244.70'
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (res) => {
        // 对响应数据做点什么
        // console.log('拦截到了响应', res)
        // 直接返回res.data，对应的就是服务器返回的数据
        return res.data
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

//取url, 本地调试时做代理。发布时关闭url处理。
function getUrl (api, pathParam) {
    let url = apis.getApiUrl(api);
    // 处理path：参数
    let newPathParam = { ...pathParam, times: new Date().getTime() }
    if (newPathParam && _.isObject(newPathParam)) {
        let keys = _.allKeys(newPathParam);
        keys.forEach(key => {
            let reg = new RegExp(`:${key}`);
            url = url.replace(reg, newPathParam[key]);
        })
    }
    return url;
}

function post (api, params = {}, pathParam = null, option = null) {
    console('request post api', api, getUrl(api, pathParam), params);
    return axiosInstance.post(getUrl(api, pathParam), params, option);
}
function put (api, params = {}, pathParam = null, option = null) {
    console('request post api', api, getUrl(api, pathParam), params);
    return axiosInstance.put(getUrl(api, pathParam), params, option);
}

function deletes (api, params = {}, pathParam = null, option = null) {
    console('request post api', api, getUrl(api, pathParam), params);
    return axiosInstance.delete(getUrl(api, pathParam), params, option);
}

function get (api, params = {}, pathParam = null, option = {}) {
    console.log('request get api ', api, getUrl(api, pathParam), params);
    return axiosInstance.get(getUrl(api, pathParam), { params, ...option, withCredentials: true });
}

export default {
    post,
    get,
    deletes,
    put,
};