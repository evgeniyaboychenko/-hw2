export default {
  /**
   * Загрузка комментариев по id товара
   * @param id
   * @return {Function}
   */
  loadComments: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          // url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { commentList: res.data.result.items, count: res.data.result.count } });
        // const {comment} = getState();
        // console.log('k22dk',comment);
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  addComment: (id, comment, userName) => {
      return async (dispatch, getState, services) => {
        // Сброс текущих комментариев и установка признака ожидания загрузки
        dispatch({ type: 'comment/add-start' });
        const body=
        {
          "text": comment,
          "parent": {
            "_id": id,
            "_type":  "article"
          }
        };

        try {
          const res = await services.api.request({
            url: `/api/v1/comments`,
            method: 'POST',
            body: JSON.stringify(body)
          });
          dispatch({ type: 'comment/add-success', payload: {...res.data.result, author: {...res.data.result.author, profile: {name:userName}}}});
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: 'comment/add-error' });
        }
      };
  }
};
