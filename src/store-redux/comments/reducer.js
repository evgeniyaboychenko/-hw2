
// Начальное состояние
export const initialState = {
  commentList: [],
  waiting: false, // признак ожидания загрузки
  activeId: '',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, commentList: [], waiting: true};

    case 'comments/load-success':
      return  { ...state, commentList: action.payload.commentList,  waiting: false };

    case 'comments/load-error':
      return { ...state, commentList: [], waiting: false};

    case 'comment/add-start':
      return { ...state, waiting: true };

    case 'comment/add-success':
        return { ...state, commentList: [...state.commentList, action.payload], waiting: false, activeId:""};

    case 'comment/add-error':
      return { ...state, waiting: false};

    case 'comment/set':
      return {...state, activeId:action.payload}

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
