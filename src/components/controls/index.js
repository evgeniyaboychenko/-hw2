import React, { useState }from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from '../../utils';

function Controls(props) {
  const {listBasket} = props;
  // const [isShowModal, setModalIsShow ] = useState(false);

  // const callbacks = {
  //   onShowModal: () => {
  //     setModalIsShow(true);
  //   },
  // }

  return (
    <div className="Controls">
      <div className="Controls-info">В корзине:
        {!listBasket.length ? <b>пусто</b> : <b>{listBasket.length} {plural(listBasket.length,  {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}  / {priceFormat(listBasket.reduce((acc, item)=> acc + item.price*item.count, 0))} ₽</b> }
      </div>
      <button className="Controls-btn" onClick={() =>props.onShowModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  onShowModal:  PropTypes.func,

};

Controls.defaultProps = {
  onAdd: () => {},
  onShowModal: () => {},
};

export default React.memo(Controls);
