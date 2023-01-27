import { AnyAction } from "redux";
import { TWsData } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-profile-actions";
import { wsProfileReducer, initialState } from "./ws-profile-reducer";

describe('web-socket profile reducer', () => {
  const testWsData: TWsData = {
    success: true,
    orders: [
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        _id: "",
        status: "done",
        name: "Бургер",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      }
    ],
    total: 1,
    totalToday: 1
  }

  it('should return the initial state', () => {
    expect(wsProfileReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle ws-profile-connecting action", () => {
    const result = wsProfileReducer(initialState, wsConnecting());

    expect(result).toEqual({
      ...initialState,
      status: "CONNECTING..."
    });
  });

  it("should handle ws-profile-open action", () => {
    const result = wsProfileReducer(initialState, wsOpen());

    expect(result).toEqual({
      ...initialState,
      status: "ONLINE"
    });
  });

  it("should handle ws-profile-close action", () => {
    const result = wsProfileReducer(initialState, wsClose());

    expect(result).toEqual({
      ...initialState,
      status: "OFFLINE"
    });
  });

  it("should handle ws-profile-error action", () => {
    const result = wsProfileReducer(initialState, wsError("404 error"));

    expect(result).toEqual({
      ...initialState,
      connectingError: "404 error"
    });
  });

  it("should handle ws-profile-message action", () => {
    const result = wsProfileReducer(initialState, wsMessage(testWsData));

    expect(result).toEqual({
      ...initialState,
      data: testWsData
    });
  });
})
