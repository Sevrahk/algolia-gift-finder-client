import * as types from './actionTypes';

export const updateSearch = (payload) => {
    return {
        type: types.UPDATE_SEARCH,
        payload: payload
    };
};

export const updateProducts = (payload) => {
    return {
        type: types.UPDATE_PRODUCTS,
        payload: payload
    };
};

export const updateCurrentPage = (payload) => {
    return {
        type: types.UPDATE_CURRENT_PAGE,
        payload: payload
    };
};

export const updateFilter = (payload) => {
    return {
        type: types.UPDATE_FILTER,
        payload: payload
    };
};
