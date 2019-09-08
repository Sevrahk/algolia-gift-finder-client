import * as types from '../actions/actionTypes';

const initialState = {
    search: '',
    products: [],
    nbProducts: 0,
    spellFix: null,
    currentPage: 1,
    filters: {
        free_shipping: false,
        priceMin: '',
        priceMax: '',
    },
};

function updateSearch(state, payload) {
    return {
        ...state,
        search: payload,
        currentPage: 1,
        spellFix: null
    };
}

function updateProducts(state, payload) {
    return {
        ...state,
        products: payload.products,
        nbProducts: payload.nbProducts,
        spellFix: payload.spellFix
    };
}

function updateCurrentPage(state, payload) {
    return {
        ...state,
        currentPage: payload
    };
}

function updateFilter(state, payload) {
    return {
        ...state,
        filters: {
            ...state.filters,
            ...payload
        }
    };
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_SEARCH:
            return updateSearch(state, action.payload);

        case types.UPDATE_PRODUCTS:
            return updateProducts(state, action.payload);

        case types.UPDATE_CURRENT_PAGE:
            return updateCurrentPage(state, action.payload);

        case types.UPDATE_FILTER:
            return updateFilter(state, action.payload);

        default:
            return state;
    }
}
