import { checkResponse } from "./check-response";
const BASE_URL = 'https://norma.nomoreparties.space/api/';

function request(url: string, options: object | undefined) {
  return fetch(url, options).then(checkResponse);
}

export const getIngredients = async () => {
  return request(BASE_URL + 'ingredients', undefined)
    .then(res => res.data);
}

export const postOrder = async (order: any) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  }

  return request(BASE_URL + 'orders', options);
}
