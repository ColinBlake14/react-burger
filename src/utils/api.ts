import { checkResponse } from "./check-response";
import { setCookie, getCookie } from "./cookies";
import { TIngredient, TOrderIds, TOrderResponse, TUserData, TUserLogin, TUserReset } from "./types";

const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const WS_URL_ORDERS_ALL = 'wss://norma.nomoreparties.space/orders/all';

type TResponseData<T> = {
  success: boolean,
  data: T
};

type TResponseWithMessage = {
  success: boolean,
  message: string
};

type TResponseAuth = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string
  }
};

interface Request {
  headers: {
    Authorization: string;
  }
}

type TResponseRefresh = Omit<TResponseAuth, 'user'>;

type TResponseUser = Omit<TResponseAuth, 'accessToken' | 'refreshToken'>;

function request<T>(url: string, options: RequestInit | undefined): Promise<T> {
  return fetch(url, options).then(res => checkResponse<T>(res));
};

export const getIngredients = async () => {
  return request<TResponseData<Array<TIngredient>>>(BASE_URL + 'ingredients', undefined)
    .then(res => res.data);
};

export const postOrder = async (order: TOrderIds) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(order)
  }

  return request<TOrderResponse>(BASE_URL + 'orders', options);
};

export const registerUser = async (user: TUserData) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }
  return request<TResponseAuth>(BASE_URL + 'auth/register', options);
};

export const loginUser = async (user: TUserLogin) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }
  return request<TResponseAuth>(BASE_URL + 'auth/login', options);
};

export const forgotPasswordUser = async (email: {email: string}) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(email)
  }
  return request<TResponseWithMessage>(BASE_URL + 'password-reset', options);
};

export const resetPasswordUser = async (data: TUserReset) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  };
  return request<TResponseWithMessage>(BASE_URL + 'password-reset/reset', options);
};

export const deleteToken = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return request<TResponseWithMessage>(BASE_URL + 'auth/logout', options);
};

export const refreshToken = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return request<TResponseRefresh>(BASE_URL + 'auth/token', options);
};

export const fetchWithRefresh = async (url: string, options: Request) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<TResponseUser>(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);

      let accessToken = refreshData.accessToken.split('Bearer ')[1];
      if (accessToken) {
        setCookie("accessToken", accessToken);
      }
      
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      
      return await checkResponse<TResponseUser>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = async () => {
  if (getCookie('accessToken')) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    };
    return fetchWithRefresh(BASE_URL + 'auth/user', options);
  }
  else return null;
}

export const patchUser = async (user: Partial<TUserData>) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(user)
  };
  return request<TResponseUser>(BASE_URL + 'auth/user', options);
}
