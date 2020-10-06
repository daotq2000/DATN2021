import * as accessoryConstants from './../constants/accessory';
import { message } from 'antd';

const initialState = {
    accessory: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case accessoryConstants.FETCH_ACCESSORY_SUCCESS:
            state = action.payload.data
            return { ...state };
        case accessoryConstants.FETCH_ACCESSORY_FAIL:
            message.error("Không thể tải danh sách linh kiện.");
            return { ...state };
        case accessoryConstants.CREATE_ACCESSORY_SUCCESS:
            message.success("Tạo linh kiện mới thành công");
            state = action.payload.data
            return { ...state };
        case accessoryConstants.CREATE_ACCESSORY_FAIL:
            message.error("Có lỗi xảy ra khi tạo linh kiện");
            return { ...state };
        case accessoryConstants.UPDATE_ACCESSORY_SUCCESS:
            message.success("Linh kiện đã được cập nhật");
            state = action.payload.data;
            return { ...state };
        case accessoryConstants.UPDATE_ACCESSORY_FAIL:
            message.error("Có lỗi xảy ra khi cập nhật linh kiện");
            return { ...state };
        case accessoryConstants.DELETE_ACCESSORY_SUCCESS:
            message.success("Linh kiện đã được xóa");
            state = action.payload.data;
            return { ...state };
        case accessoryConstants.DELETE_ACCESSORY_FAIL:
            message.error("Có lỗi xảy ra khi xóa linh kiện");
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;