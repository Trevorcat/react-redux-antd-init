import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_REQUEST_STATUS } from '../../../service/constants';

import { getConfigList, getConfig, postNewConfig } from './api-request';

import { actions as configSet } from './index';
import {Config} from './types';

export const fetchConfigList = createAsyncThunk(
  'config/fetchConfigList',
  async (payload: {
    pagination: number;
    limit: number;
    search?: string;
  }, {dispatch, getState}) => {
    const { data }: any = await getConfigList(payload);
    
    dispatch(configSet.updateConfigMapping(data));

    return data;
  }
);

export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (payload: {
    id: number;
  }, {dispatch, getState}) => {
    const { data }: any = await getConfig(payload);

    dispatch(configSet.updateConfigById(data));

    return data;
  }
);

export const createConfig = createAsyncThunk(
    'config/createConfig',
    async (payload: {
        config: Config;
    }, {dispatch, getState}) => {
        const { data }: any = await postNewConfig(payload);
    
        dispatch(configSet.updateConfigMapping({
            [data.id]: data
        }));
    
        return data;
    }
);