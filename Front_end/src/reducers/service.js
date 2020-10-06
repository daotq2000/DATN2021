import * as serviceConstants from '../constants/service';
import { message } from 'antd';

const initialState = {
    service: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case serviceConstants.CREATE_SERVICE_SUCCESS:
            message.success("Đã tạo dịch vụ");
            state = action.payload.data;
            return { ...state };
        case serviceConstants.CREATE_SERVICE_FAIL:
            message.error("Có lỗi xảy ra khi tạo dịch vụ");
            return { ...state };
        case serviceConstants.FETCH_SERVICE_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case serviceConstants.FETCH_SERVICE_FAIL:
            message.error("Có lỗi xảy ra khi tải dịch vụ");
            return { ...state };
        case serviceConstants.UPDATE_SERVICE_SUCCESS:
            message.success("Đã cập nhật dịch vụ");
            state = action.payload.data;
            return { ...state }
        case serviceConstants.UPDATE_SERVICE_FAIL:
            message.error("Có lỗi xảy ra khi cập nhật dịch vụ");
            state = action.payload.e;
            return { ...state }
        default:
            return { ...state };
    }
}

export default reducer;