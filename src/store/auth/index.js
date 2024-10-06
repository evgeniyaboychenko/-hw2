import StoreModule from '../module';

/**
 * Информауия об авторизации пользователя
 */
class AuthState extends StoreModule {
  initState() {
    return {
      isAuth: 'NO_AUTH',
      user: {
        login :'',
        password: ''
      },
      userName: '',
      // userData: {},
      waiting: false, // признак ожидания загрузки
      error: '',
    };
  }

  resetState() {
    this.setState({
      ...this.getState(),
      error: '',
      user: {
        login :'',
        password: ''
      },
    });
  }

  async loadUserName() {
    const token = localStorage.getItem('token');
    if(token) {
      this.setState({
        ...this.getState(),
        error: '',
        userName: '',
        isAuth: 'AUTH',
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
          // console.log(json.result);
          // Данные авторизациии
          this.setState(
            {
              ...this.getState(),
              userName: json.result.profile.name,
              isAuth: 'AUTH',
              waiting: false,
              error: ''
            },
                'Name пользователя успешно загружен',
              );
          } else {
            this.setState({
            ...this.getState(),
            userName: '',
            isAuth: 'NO_AUTH',
            error: "Что-то пошло не так",
            waiting: false,
          })
        };
      } catch (error) {
        // Ошибка при загрузке
        // @todo В стейт можно положить информацию об ошибке
        this.setState({
          ...this.getState(),
          userName: '',
          isAuth: 'NO_AUTH',
          error: error.message,
          waiting: false,
        });
      }
    }
  }


  setParams(value,name) {
    const user = this.getState().user;
    user[name] = value;
    this.setState(
      {
        ...this.getState(),
        user: {...user}
      }
    );
  }


  async userExit() {
    this.setState({
      ...this.getState(),
      error: '',
      waiting: true,
    });

    const token = (document.cookie.match('(^|; )' + encodeURIComponent('token') + '=([^;]+)') || []).pop() || null;

    try {
      const response = await fetch(`/api/v1/users/sign`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
          },
        }
      );

      if (response.ok) {
      const json = await response.json();
      localStorage.removeItem('token');
      this.setState(
            {
              ...this.getState(),
              userName: '',
              // userData: {},
              isAuth: 'NO_AUTH',
              user: {
                login :'',
                password: ''
              },
              waiting: false,
              error: ''
            },
            'Выход выполнен успешно',
          );
        return;
      }
      if (response.status === 403 || response.status === 404) {
        const {error}  = await response.json();
        this.setState({
          ...this.getState(),
          isAuth: 'AUTH',
          error: error.message,
          waiting: false,
        },
          'Выход не выполнен',);
        } else {
          this.setState({
          ...this.getState(),
          isAuth: 'AUTH',
          error: "Что-то пошло не так",
          waiting: false,
        })
      };
    } catch (error) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
    }
  }


  /**
   * Отправка формы
   * @param login, password {String}
   * @return {Promise<void>}
   */
  async submitForm(login, password, navigate) {
    this.setState({
      ...this.getState(),
      user: {
        login :login,
        password: password
      },
      // login,
      // password,
      error: '',
      userName: '',
      // userData: {},
      waiting: true,
    });

    const user = {
      "login": login,
      "password": password,
    }

    try {
      const response = await fetch(`/api/v1/users/sign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }
      );

      if (response.ok) {
        const json = await response.json();
        // console.log(json.result.token)
        localStorage.setItem('token', json.result.token)
        // Данные авторизациии
        this.setState(
              {
                ...this.getState(),
                userName: json.result.user.profile.name,
                // userData: json.result.user,
                isAuth: 'AUTH',
                // user,
                // login,
                // password,
                waiting: false,
                error: ''
              },
              'Авторизация выполнена успешно',
            );
            navigate();
          return;
        }
      if (response.status === 400) {
        console.log(response);
        const {error}  = await response.json();
        const message = error.message;
        this.setState({
          ...this.getState(),
          isAuth: 'NO_AUTH',
          error: error.data.issues[0].message,
          waiting: false,
        },
          'Авторизация не выполнена',);
      } else {
          this.setState({
          ...this.getState(),
          isAuth: 'NO_AUTH',
          error: "Что-то пошло не так",
          waiting: false,
        })
      };
    } catch (error) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        userName: '',
        // userData: {},
        // user: {
        //   login :login,
        //   password: password},
        isAuth: 'NO_AUTH',
        error: error.message,
        waiting: false,
      });
    }
  }
}

export default AuthState;
