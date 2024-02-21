import { IFMenuBase } from './types';

export const ROUTE_LIST: IFMenuBase[] = [
  // 菜单相关路由
  {
    key: '/test',
    title: 'home',
    component: 'Home',
  },
  {
    key: '/404',
    title: '404',
    component: 'NotFound',
  }
];