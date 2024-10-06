import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      userData: {},
      waiting: false, // признак ожидания загрузки
    };
  }
    /**
   * Загрузка данных о пользователе по token
   * @param token {String}
   * @return {Promise<void>}
   */

  async loadTokenAuth(token) {
    // const token = localStorage.getItem('token')
    // if(token) {
      this.setState({
        userData: {},
        waiting: true,
      });
      try {
        const response = await fetch(`/api/v1/users/self?fields=*`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Token': token,
            },
          }
        );

        if (response.ok) {
          const json = await response.json();
          // Данные пользователя
          this.setState(
                {
                  userData: json.result,
                  waiting: false,
                },
                'Данные пользователя успешно загружены',
              );
          } else {
            this.setState({
              userData: {},
              waiting: false,
          })
        };
      } catch (error) {
        // Ошибка при загрузке
        // @todo В стейт можно положить информацию об ошибке
        this.setState({
          userData: {},
          waiting: false,
        });
      }
    // }
  }
}
export default UserState;
