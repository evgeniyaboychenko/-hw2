// Начальное состояние
export const initialState = {
  commentList: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, commentList: [], waiting: true, count: 0 };

    case 'comments/load-success':
      return { ...state, commentList: action.payload.commentList, count:action.payload.count,  waiting: false };

    case 'comments/load-error':
      return { ...state, commentList: [], waiting: false, count:0 }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
