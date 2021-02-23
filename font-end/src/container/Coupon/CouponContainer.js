import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Coupon from "../../pages/Coupon/CouponList"
import * as couponActions from '../../actions/coupon';

const CouponContainer = (props) => {
    return (
        <Coupon couponActionsCreator={props.couponActionsCreator}
            createCoupon={props.createCoupon} />
    );
}

const mapStateToProps = (state) => {
    return {
        createCoupon: state.createCoupon,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        couponActionsCreator: bindActionCreators(couponActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
