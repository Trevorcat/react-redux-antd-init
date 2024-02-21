//对外提供的服务地址
export const publicIp =
  process.env.REACT_APP_ENV === 'test'
    ? process.env.REACT_APP_API_TEST_URL
    : process.env.REACT_APP_API_PROD_URL;

//对外提供获取图片的地址
export const logoImgIp = process.env.NODE_ENV === 'development' ? '' : '';