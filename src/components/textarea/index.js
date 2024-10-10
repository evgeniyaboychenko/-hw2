import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Textarea(props) {
  const { onChange = () => {}, type = 'text', theme = '', value, placeholder, rows } = props;
  // Внутренний стейт для быстрого отображения ввода
  const [text, setValue] = useState(value);


  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(event.target.value);
    onChange(event.target.value);
  };


  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(value), [value]);

  const cn = bem('Textarea');
  return (
    <textarea
      className={cn({ theme: theme })}
      value={text}
      placeholder={placeholder}
      onChange={onChangeHandler}
      rows={rows}
    >
    </textarea>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  minLength:  PropTypes.string,
};

export default memo(Textarea);
