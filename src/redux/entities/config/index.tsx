import { createSlice } from '@reduxjs/toolkit';
import { ConfigMappingType } from './types';

const initialState: ConfigMappingType = {};

export const { reducer, actions } = createSlice({
  name: 'entities/configs',
  initialState,
  reducers: {
    updateConfigMapping: (
      state: { [x: string]: any },  // 现有的
      action: { payload: any }      // 新的
    ) => {
      const list = action.payload;
      const configs: any = state;

      list.forEach((config: { id: string }) => {
        const { id } = config || {};
        // 如果已经存在，就更新
        if (configs[id]) {
          configs[id] = { ...state[id], ...config };
        } 
        // 如果不存在，就添加
        else if (id) {
          configs[id] = config;
        }
      });

      return configs;
    },
    updateConfigById: (
      state: { [x: string]: any },
      action: { payload: { id: string } }
    ) => {
      const config = action.payload;
      const { id } = action.payload || {};

      if (state[id]) {
        state[id] = { ...state[id], ...config };
      } else if (id) {
        state[id] = config;
      }

      return state;
    },
  },
});


export default reducer;