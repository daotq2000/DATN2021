import * as productsConstants from '../constants/products';
import { message } from 'antd';
import * as accessoryConstants from '../constants/accessory';
const initialState = {
    currentPage: 0,
    content: [],
    totalElements: 0,
    totalPages: 0,
    productItem: {},
    number: 0,
    categories:[],
    manufacture:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productsConstants.FETCH_PRODUCTS_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case productsConstants.FETCH_PRODUCTS_FAIL:
            return { ...state };
        case accessoryConstants.FETCH_MANUFACTURE_SUCCESS:
            state.manufacture = action.payload.data.manufacturer;
            return { ...state };
        case accessoryConstants.FETCH_CATEGORIES_SUCCESS:
            state.categories = action.payload.data.content;
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;