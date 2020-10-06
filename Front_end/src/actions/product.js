import * as productConstants from '../constants/product';

export const actionGetProducts = (key, page, size) => {
    return {
        type: productConstants.FECTCH_PRODUCT,
        payload: {
            key, page, size
        }
    }
}

export const actionGetProductsSuccess = (data) => {
    return {
        type: productConstants.FECTCH_PRODUCT_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const actionGetProductsFail = (e) => {
    return {
        type: productConstants.FECTCH_PRODUCT_FAILED,
        payload: {
            e
        }
    }
}