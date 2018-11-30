import axios from 'axios'
import iView from 'iview'
import cookies from "./cookie";
import lodash from 'lodash'
import httpCodeMap from './httpCodeMap'
import router from '../routers'
import NProgress from 'nprogress'
let _this = iView;

// 基础配置
const defaultConfig = initConfig(process.env);
const instance = axios.create(defaultConfig);

/**
 * 初始化实例默认选项
 */
function initConfig(env) {
    const config = {
        timeout: 10000
    }
    if (env.NODE_ENV !== "development") {
        if (env.VUE_APP_API_ROOT) {
            config.baseURL = env.VUE_APP_API_ROOT
        } else {
            throw new Error("VUE_APP_API_ROOT is not found: VUE_APP_API_ROOT");
        }
    }
    return config
}

/**
 * 请求处理
 */
const fetch = (options) => {
    let { method = 'get', data, url, isUrlParams: isPostfix } = options
    let cloneData = lodash.cloneDeep(data) || {}; //eslint-disable-line

    // 处理FormData类型数据
    if (data instanceof FormData) cloneData = data

    // 请求拦截
    instance.interceptors.request.use(
        config => {
            // 统一在http请求的header都加上token
            let token = cookies.getCookie("accessToken");
            token && (config.headers.Authorization = token);
            return config;
        },
        error => {
            return Promise.error(error);
        })

    // 响应拦截
    instance.interceptors.response.use(
        response => {
            // 通过返回状态判断token是否有效
            if (response.status === 200) {
                return Promise.resolve(response);
            } else {
                console.log('401')
                return Promise.reject(response);
            }
        },
        error => {
            console.log(error, error.response);

            if (error.response && error.response.status) {
                // 异常状态处理 
                // 错误信息提示
                // router.push({name: 'login'})
                // _this.Message.error(httpCodeMap[error.response.status])
                return Promise.reject(error);
            }
        }
    );

    // 类型匹配请求方式
    switch (method.toLowerCase()) {
        case 'get':
            return instance.get(url, {
                params: cloneData,
                // timeout,
            })
        case 'delete':
            return instance.delete(url, {
                data: cloneData,
            })
        case 'post':
            const opts = {
                url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    ...(options.headers || {}),
                },
            };
            if (isPostfix) {
                opts.params = cloneData
            } else {
                opts.data = cloneData
            }
            return instance(opts);
        case 'put':
            return instance.put(url, cloneData)
        case 'patch':
            return instance.patch(url, cloneData)
        default:
            return instance({
                // timeout,
                ...options,
            })
    }
}

/**
 * request请求方法 
 * @param {url,data,method,...} options 
 * @param isUrlParams  POST请求方法是否通过URL传参
 */
export default function request(options) {
    // loading开始
    options.loading && _this.Spin.show();
    // fetch api
    return fetch(options).then((response) => {
        let { statusText, status, data, request: req = {}, message: msge, msg, errorMsg } = response
        // if (!data || data.code !== 0) {
        //     // 根据后端code错误处理
        //     // throw new Error(`code is not 1:${msge || msg || errorMsg || '接口请求失败，请重试'}`);
        // }
        // if (data instanceof Array) {
        //     // 返回数据处理
        //     // data = {
        //     //     list: data,
        //     // }
        // }
        // loading结束
        options.loading && _this.Spin.hide();
        return Promise.resolve({ //eslint-disable-line
            success: true,
            message: statusText,
            statusCode: status,
            ...data,
        })
    }).catch((error) => {
        const { response, config = {} } = error
        console.log(error, response);

        let msg, statusCode;
        if (response && response instanceof Object) {
            const { data, status, statusText } = response
            statusCode = status
            msg = data.msg || httpCodeMap[response.status] || statusText
        } else {
            statusCode = 600
            msg = error.msg || response && httpCodeMap[response.status] || '网络错误'
        }
        // loading结束
        options.loading && _this.Spin.hide();
        // 错误信息提示
        if (statusCode == 401) {
            _this.Message.error('您未登录，即将跳转登录页面')
            NProgress.start();
            window.setTimeout(() => {
                router.push({name: 'Login'})
            }, 1000)
        } else {
            _this.Message.error(msg)
        }
        // 抛出错误信息
        return Promise.reject({ success: false, statusCode, message: msg, url: config.url })
    })
}