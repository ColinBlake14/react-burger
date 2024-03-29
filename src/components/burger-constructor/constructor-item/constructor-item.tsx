import React, { useRef } from "react";
import styles from './constructor-item.module.css';
import { useDrop, useDrag } from "react-dnd";

import { 
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import { 
  deleteBunAction,
  deleteIngredientAction,
  moveIngredientAction,
} from "../../../services/actions/burger-constructor";

import { 
  decreaseItemAction, 
  resetBunsCountAction,
} from "../../../services/actions/burger-ingredients";
import { TIngredientConstructor } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

type TConstructorItem = {
  itemData: TIngredientConstructor,
  pos?: "top" | "bottom" | undefined,
  isLocked?: boolean,
  classNameAdd?: string,
  index?: number,
  id?: string
}

export const ConstructorItem = ({itemData, pos, isLocked, classNameAdd, index, id}: TConstructorItem) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      };

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
        return;
      };

      if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
        return;
      };
      
      dispatch(moveIngredientAction(dragIndex, hoverIndex!));
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onClick = () => {
    if (itemData.type === "bun") {
      dispatch(deleteBunAction());
      dispatch(resetBunsCountAction());
    } else {
      dispatch(deleteIngredientAction(itemData.uuid));
      dispatch(decreaseItemAction(itemData._id));
    }
  }

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div className={`${styles.constructor__item} ${classNameAdd}`} 
      style={{opacity}} ref={itemData.type === 'bun' ? null : ref} data-handler-id={handlerId}>
      {isLocked ? 
      (<div className={styles.drag__item__container}/>)
      : 
      (<div className={styles.drag__item__container}>
        <DragIcon type="primary" />
      </div>)
      }
      <ConstructorElement
        handleClose={onClick}
        type={pos}
        isLocked={isLocked}
        text={
          pos ? 
          (pos === "top" ? itemData.name + " (верх)" : itemData.name + " (низ)") 
          : 
          itemData.name
        }
        price={itemData.price}
        thumbnail={itemData.image}
      />
    </div>
  )
}
