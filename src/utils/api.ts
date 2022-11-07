const URL_API = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = async () => {
  const res = await fetch(URL_API);
  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
