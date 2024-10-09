import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Textarea(props) {
  const { onChange = () => {}, type = 'text', theme = '' } = props;
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, props.name), 600),
    [onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Textarea');
  return (
    <textarea
      className={cn({ theme: theme })}
      value={value}
      placeholder={props.placeholder}
      onChange={onChangeHandler}
      rows={props.rows}
    >
    </textarea>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  minLength:  PropTypes.string,
};

export default memo(Textarea);
