import { AnyAction } from "redux";
import { TWsData } from "../../utils/types";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-actions";
import { wsReducer, initialState } from "./ws-reducer";

describe('web-socket reducer', () => {
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
    expect(wsReducer(undefined, {} as unknown as AnyAction)).toEqual(initialState);
  });

  it("should handle ws-connecting action", () => {
    const result = wsReducer(initialState, wsConnecting());

    expect(result).toEqual({
      ...initialState,
      status: "CONNECTING..."
    });
  });

  it("should handle ws-open action", () => {
    const result = wsReducer(initialState, wsOpen());

    expect(result).toEqual({
      ...initialState,
      status: "ONLINE"
    });
  });

  it("should handle ws-close action", () => {
    const result = wsReducer(initialState, wsClose());

    expect(result).toEqual({
      ...initialState,
      status: "OFFLINE"
    });
  });

  it("should handle ws-error action", () => {
    const result = wsReducer(initialState, wsError("404 error"));

    expect(result).toEqual({
      ...initialState,
      connectingError: "404 error"
    });
  });

  it("should handle ws-message action", () => {
    const result = wsReducer(initialState, wsMessage(testWsData));

    expect(result).toEqual({
      ...initialState,
      data: testWsData
    });
  });
})
