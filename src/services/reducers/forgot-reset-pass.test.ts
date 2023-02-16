import { AnyAction } from "redux";
import { forgotPassFailedAction, forgotPassRequestAction, forgotPassSuccessAction, resetPassFailedAction, resetPassRequestAction, resetPassSuccessAction } from "../actions/forgot-reset-pass";
import { forgotResetPassReducer, initialState} from "./forgot-reset-pass";

describe('forgot-reset-pass reducer', () => {
  it('should return the initial state', () => {
    expect(forgotResetPassReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle forgot pass request action", () => {
    const result = forgotResetPassReducer(initialState, forgotPassRequestAction());

    expect(result).toEqual({
      ...initialState,
      forgotPasswordRequest: true
    });
  });

  it("should handle forgot pass success action", () => {
    const result = forgotResetPassReducer(initialState, forgotPassSuccessAction());

    expect(result).toEqual({
      ...initialState,
      forgotPasswordSuccess: true
    });
  });

  it("should handle forgot pass failed action", () => {
    const result = forgotResetPassReducer(initialState, forgotPassFailedAction());

    expect(result).toEqual({
      ...initialState,
      forgotPasswordError: true
    });
  });

  it("should handle reset pass request action", () => {
    const result = forgotResetPassReducer(initialState, resetPassRequestAction());

    expect(result).toEqual({
      ...initialState,
      resetPasswordRequest: true
    });
  });

  it("should handle reset pass success action", () => {
    const result = forgotResetPassReducer(initialState, resetPassSuccessAction());

    expect(result).toEqual({
      ...initialState,
      resetPasswordSuccess: true
    });
  });

  it("should handle reset pass failed action", () => {
    const result = forgotResetPassReducer(initialState, resetPassFailedAction());

    expect(result).toEqual({
      ...initialState,
      resetPasswordError: true
    });
  });
})
