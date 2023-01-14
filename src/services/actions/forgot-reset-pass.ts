import { AppDispatch, AppThunk } from "../..";
import { forgotPasswordUser, resetPasswordUser } from "../../utils/api";
import { TUserReset } from "../../utils/types";

export const FORGOT_PASS_REQUEST: 'FORGOT_PASS_REQUEST' = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS: 'FORGOT_PASS_SUCCESS' = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAILED: 'FORGOT_PASS_FAILED' = 'FORGOT_PASS_FAILED';

export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILED: 'RESET_PASS_FAILED' = 'RESET_PASS_FAILED';

export interface IForgotPassRequestAction {
  readonly type: typeof FORGOT_PASS_REQUEST;
}

export interface IForgotPassSuccessAction {
  readonly type: typeof FORGOT_PASS_SUCCESS;
}

export interface IForgotPassFailedAction {
  readonly type: typeof FORGOT_PASS_FAILED;
}

export interface IResetPassRequestAction {
  readonly type: typeof RESET_PASS_REQUEST;
}

export interface IResetPassSuccessAction {
  readonly type: typeof RESET_PASS_SUCCESS;
}

export interface IResetPassFailedAction {
  readonly type: typeof RESET_PASS_FAILED;
}

export type TForgotResetPassActions = 
  | IForgotPassRequestAction
  | IForgotPassSuccessAction
  | IForgotPassFailedAction
  | IResetPassRequestAction
  | IResetPassSuccessAction
  | IResetPassFailedAction
;

export const forgotPassRequestAction = (): IForgotPassRequestAction => ({
  type: FORGOT_PASS_REQUEST
});

export const forgotPassSuccessAction = (): IForgotPassSuccessAction => ({
  type: FORGOT_PASS_SUCCESS
});

export const forgotPassFailedAction = (): IForgotPassFailedAction => ({
  type: FORGOT_PASS_FAILED
});

export const resetPassRequestAction = (): IResetPassRequestAction => ({
  type: RESET_PASS_REQUEST
});

export const resetPassSuccessAction = (): IResetPassSuccessAction => ({
  type: RESET_PASS_SUCCESS
});

export const resetPassFailedAction = (): IResetPassFailedAction => ({
  type: RESET_PASS_FAILED
});

export const forgotPasswordRequest: AppThunk = (user: {email: string}) => (dispatch: AppDispatch) => {
  dispatch(forgotPassRequestAction());
  forgotPasswordUser(user).then(res => {
    if (res) {
      dispatch(forgotPassSuccessAction());
    } else {
      dispatch(forgotPassFailedAction());
    }
  }).catch( err => {
      dispatch(forgotPassFailedAction());
    });
};

export const resetPasswordRequest: AppThunk = (data: TUserReset) => (dispatch: AppDispatch) => {
  dispatch(resetPassRequestAction());
  resetPasswordUser(data).then(res => {
    if (res) {
      dispatch(resetPassSuccessAction());
    } else {
      dispatch(resetPassFailedAction());
    }
  }).catch( err => {
      dispatch(resetPassFailedAction());
    });
};
