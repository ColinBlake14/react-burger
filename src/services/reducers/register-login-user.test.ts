import { AnyAction } from "redux";
import { TUserData } from "../../utils/types";
import { authUserFailedAction, authUserRequestAction, authUserSuccessAction, loginUserFailedAction, loginUserRequestAction, loginUserSuccessAction, logoutUserFailedAction, logoutUserRequestAction, logoutUserSuccessAction, registerUserFailedAction, registerUserRequestAction, registerUserSuccessAction, setUserDataAction } from "../actions/register-login-user";
import { registerLoginUserReducer, initialState } from "./register-login-user";

describe('register-login-user reducer', () => {
  const testUserData: TUserData = {
    email: "colinblake@mail.ru",
    password: "testPassHere123",
    name: "Colin Blake"
  }

  it('should return the initial state', () => {
    expect(registerLoginUserReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle register user request action", () => {
    const result = registerLoginUserReducer(initialState, registerUserRequestAction());

    expect(result).toEqual({
      ...initialState,
      registrationRequest: true
    });
  });

  it("should handle register user success action", () => {
    const result = registerLoginUserReducer(initialState, registerUserSuccessAction(testUserData));

    expect(result).toEqual({
      ...initialState,
      user: testUserData,
      loginSuccess: true
    });
  });

  it("should handle register user failed action", () => {
    const result = registerLoginUserReducer(initialState, registerUserFailedAction());

    expect(result).toEqual({
      ...initialState,
      registrationError: true
    });
  });

  it("should handle login user request action", () => {
    const result = registerLoginUserReducer(initialState, loginUserRequestAction());

    expect(result).toEqual({
      ...initialState,
      loginRequest: true
    });
  });

  it("should handle login user success action", () => {
    const result = registerLoginUserReducer(initialState, loginUserSuccessAction(testUserData));

    expect(result).toEqual({
      ...initialState,
      loginSuccess: true,
      user: testUserData
    });
  });

  it("should handle login user failed action", () => {
    const result = registerLoginUserReducer(initialState, loginUserFailedAction());

    expect(result).toEqual({
      ...initialState,
      loginError: true,
      authChecked: true
    });
  });

  it("should handle logout user request action", () => {
    const result = registerLoginUserReducer(initialState, logoutUserRequestAction());

    expect(result).toEqual({
      ...initialState,
      logoutRequest: true
    });
  });

  it("should handle logout user success action", () => {
    const result = registerLoginUserReducer({...initialState, user: testUserData, loginSuccess: true}, logoutUserSuccessAction());

    expect(result).toEqual({
      ...initialState
    });
  });

  it("should handle logout user failed action", () => {
    const result = registerLoginUserReducer(initialState, logoutUserFailedAction());

    expect(result).toEqual({
      ...initialState,
      logoutError: true
    });
  });

  it("should handle set user data action", () => {
    const result = registerLoginUserReducer(initialState, setUserDataAction(testUserData));

    expect(result).toEqual({
      ...initialState,
      user: testUserData
    });
  });

  it("should handle auth user request action", () => {
    const result = registerLoginUserReducer(initialState, authUserRequestAction());

    expect(result).toEqual({
      ...initialState,
      authRequest: true
    });
  });

  it("should handle auth user success action", () => {
    const result = registerLoginUserReducer(initialState, authUserSuccessAction(testUserData));

    expect(result).toEqual({
      ...initialState,
      loginSuccess: true,
      authChecked: true,
      user: testUserData
    });
  });

  it("should handle auth user failed action", () => {
    const result = registerLoginUserReducer(initialState, authUserFailedAction());

    expect(result).toEqual({
      ...initialState,
      authChecked: true
    });
  });
})
