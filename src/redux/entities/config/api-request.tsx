import { get, post, put } from '../../../service/api';

export const getConfigList = async (payload: {
    pagination: number;
    limit: number;
    search?: string;
}) => {
    try {
        const {data}: any = await get(
            `/api/get-config-list`,
            payload,
            {},
            {}
        );
        return data;
    } catch (error) {
        throw error;
    }
}

export const getConfig = async (payload: {
    id: number;
}) => {
    try {
        const {data}: any = await get(
            `/api/get-config`,
            payload,
            {},
            {}
        );
        return data;
    } catch (error) {
        throw error;
    }
}

export const postNewConfig = async (payload: {
    config: any;
}) => {
    try {
        const {data}: any = await post(
            `/api/create-config`,
            payload,
            {}
        );
        return data;
    } catch (error) {
        throw error;
    }
}