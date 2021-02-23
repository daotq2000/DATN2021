


// export function* deleteServiceSaga({ payload }) {
//     try {
//         const res = yield call(deleteService, payload.id);
//         if (res.status === STATUS_CODE.SUCCESS) {
//             message.success("Đã xóa dịch vụ");
//             yield put(actionGetAccessories(res.data));
//         }
//         else {
//             yield put(actionDeleteServiceFail(res.data));
//         }
//     }
//     catch (e) {
//         yield put(actionDeleteServiceFail(e));
//     }
// }