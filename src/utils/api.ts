const URL_API = 'https://norma.nomoreparties.space/api/ingredients';
const URL_POST_API = 'https://norma.nomoreparties.space/api/orders';

export const getIngredients = async () => {
  return fetch(URL_API).then(res => {
    if (res.ok) {
      return res.json().then(json => json.data);
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
}

export const postOrder = async (order: any) => {
  return fetch(URL_POST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
}
