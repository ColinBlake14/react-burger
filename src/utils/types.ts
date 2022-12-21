export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
};

export type TIngredientConstructor = {
  _id: string,
  name: string,
  type: string,
  price: number,
  image: string,
  uuid: string
}

export type TOrderIds = {
  ingredients: Array<string>
};

export type TUserData = {
  email: string,
  password: string,
  name: string
};

export type TUserLogin = Omit<TUserData, 'password'>;

export type TUserReset = {
  password: string,
  token: string
}

export type TOrderResponse = {
  name: string,
  success: boolean,
  order: {
    number: number
  }
}
