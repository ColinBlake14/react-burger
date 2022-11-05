const URL_API = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = async () => {
  try {
    const res = await fetch(URL_API);
    const json = await res.json();

    return json.data;
  } catch (err) {
    console.log('ERR: ', err);
    return;
  }
}