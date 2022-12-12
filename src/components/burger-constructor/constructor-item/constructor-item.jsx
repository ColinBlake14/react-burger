import React, { useRef } from "react";
import styles from './constructor-item.module.css';
import PropTypes from 'prop-types';
import { constructorIngredientType } from "../../../utils/types";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

import { 
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import { 
  DELETE_BUN, 
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from "../../../services/actions/burger-constructor";

import { 
  DECREASE_ITEM, 
  RESET_BUNS_COUNT
} from "../../../services/actions/burger-ingredients";

export const ConstructorItem = ({itemData, pos, isLocked, classNameAdd, index, id}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };
      
      dispatch({ type: MOVE_INGREDIENT, fromIndex: dragIndex, toIndex: hoverIndex });
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
      dispatch({ type: DELETE_BUN });
      dispatch({ type: RESET_BUNS_COUNT });
    } else {
      dispatch({ type: DELETE_INGREDIENT, uuid: itemData.uuid });
      dispatch({ type: DECREASE_ITEM, _id: itemData._id });
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

ConstructorItem.propTypes = {
  itemData: constructorIngredientType.isRequired,
  pos: PropTypes.string,
  isLocked: PropTypes.bool,
  classNameAdd: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string
}
