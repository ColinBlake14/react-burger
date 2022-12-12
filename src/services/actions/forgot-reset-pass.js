import { forgotPasswordUser, resetPasswordUser } from "../../utils/api";

export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAILED = 'FORGOT_PASS_FAILED';

export const RESET_PASS_REQUEST = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILED = 'RESET_PASS_FAILED';

export function forgotPasswordRequest(user) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASS_REQUEST
    });
    forgotPasswordUser(user).then(res => {
      if (res) {
        dispatch({
          type: FORGOT_PASS_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: FORGOT_PASS_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: FORGOT_PASS_FAILED
        });
      });
  };
};

export function resetPasswordRequest(data) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASS_REQUEST
    });
    resetPasswordUser(data).then(res => {
      if (res) {
        dispatch({
          type: RESET_PASS_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: RESET_PASS_FAILED
        });
      }
    }).catch( err => {
        dispatch({
          type: RESET_PASS_FAILED
        });
      });
  };
};
