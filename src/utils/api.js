import { checkResponse } from "./check-response";
import { setCookie, getCookie } from "./cookies";

const BASE_URL = 'https://norma.nomoreparties.space/api/';

function request(url, options) {
  return fetch(url, options).then(checkResponse);
};

export const getIngredients = async () => {
  return request(BASE_URL + 'ingredients', undefined)
    .then(res => res.data);
};

export const postOrder = async (order) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  }

  return request(BASE_URL + 'orders', options);
};

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }
  return request(BASE_URL + 'auth/register', options);
};

export const loginUser = async (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  }
  return request(BASE_URL + 'auth/login', options);
};

export const forgotPasswordUser = async (email) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(email)
  }
  return request(BASE_URL + 'password-reset', options);
};

export const resetPasswordUser = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  };
  return request(BASE_URL + 'password-reset/reset', options);
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
  return request(BASE_URL + 'auth/logout', options);
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
  return request(BASE_URL + 'auth/token', options);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  };
  return request(BASE_URL + 'auth/user', options);
}

export const patchUser = async (user) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(user)
  };
  return request(BASE_URL + 'auth/user', options);
}
