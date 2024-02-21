import axios from 'axios';
import { publicIp } from './apiIP';
import { message } from 'antd';
import umbrella from 'umbrella-storage';

let hide: any = null;
message.config({
  duration: 2,
  maxCount: 1,
  // rtl: true,
});

const instance = axios.create({
  //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  baseURL: publicIp, //根据自己配置的反向代理去设置不同环境的baeUrl
});
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.get['Content-Type'] = 'multipart/form-data';

let httpCode = {
  //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  // 400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  405: '请求方法不允许',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
};

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  (config) => {
    config.headers &&
      (config.headers['Authorization'] =
        umbrella.getLocalStorage('Auth') || '');

    if (config.headers && config.url === '/merchants') {
      config.headers.Authorization = `Internal ${process.env.REACT_APP_ENV === 'test'
          ? process.env.REACT_APP_REGISTER_TEST_AUTH
          : process.env.REACT_APP_REGISTER_PROD_AUTH
        }`;
    }

    if (config.data && config.data.isShow === false) {
      hide = null;
      delete config.data.isShow;
    } else {
      hide = message.loading({ content: 'Loading...', duration: 2 });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  (response) => {
    hide && hide();
    if (response.status === 200) {
      // 响应结果里的status: 200为正常
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    hide && hide();

    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      //@ts-ignore
      let tips =
        //@ts-ignore
        error.response.status in httpCode
          ? //@ts-ignore
          httpCode[error.response.status]
          : error.response.data.message;

      if (error.response.status === 401) {
        // 根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        umbrella.setLocalStorage('Auth', '');
        umbrella.setLocalStorage('user', { isLogin: false });
        umbrella.setLocalStorage('merchant', {});
        window.location.reload();
      } else if (error.response.data.code === 7) {
        return Promise.reject(error);
      } else if (error.response.data.code === 10) {
        return Promise.reject(error.response.data.message);
      } else if (error.response.status in httpCode) {
        return Promise.reject(tips);
      }

      return Promise.resolve(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

/* 统一封装get请求 */
export const get = (url: string, params: any, config = {}, data?: any) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url: string, data: any, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装patch请求  */
export const patch = (url: string, data: any, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'patch',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装put请求  */
export const put = (url: string, data: any, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'put',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装put请求  */
export const deleteRequest = (url: string, data: any, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'delete',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};