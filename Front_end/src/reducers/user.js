
import { message } from "antd";
import * as Contraints from "../constants/users";
const initialState = {
   users:{},
   headers:{}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Contraints.LOGIN_SUCCESS:
            state.headers = action.payload.data;
            localStorage.setItem('Authorization',action.payload.data);
            return {...state}

        case Contraints.LOGIN_FAILED:
        message.error('Đăng nhập thất bại')
        return {...state}
        default:
            return { ...state };
    }
}

export default reducer;