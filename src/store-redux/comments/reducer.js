import comment from "../../components/comment";
import commentList from "../../components/comment-list";

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
      return  { ...state, commentList: action.payload.commentList, count:action.payload.count,  waiting: false };

    case 'comments/load-error':
      return { ...state, commentList: [], waiting: false, count:0 };

    case 'comment/add-start':
      return { ...state, waiting: true };

    case 'comment/add-success':
        return { ...state, commentList: [...state.commentList, action.payload], waiting: false, count:state.count + 1};

    case 'comment/add-error':
      return { ...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
