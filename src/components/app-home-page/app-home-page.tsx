import React from 'react';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppSelector } from '../../utils/hooks';

export function AppHomePage() {
  const {isLoading, hasError} = useAppSelector(store => store.ingredients);

  return (
    <>
      {isLoading && (
        <p className="text text_type_main-medium">Загрузка...</p>
      )}
      {hasError && (
        <p className="text text_type_main-medium">
          Не удалось загрузить данные
        </p>
      )}
      {!isLoading && !hasError && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      )}
    </>
  )
}
