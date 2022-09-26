"use strict"

let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);

        }

    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};

/*В методы апиконнектора не нужно ничего присваивать. Вы должны вызывать метод...И вторым аргументом у вас не передаётся колбек. У вас есть только какой-то response, а остальная часть за пределами аргумента....Перепроверьте все скобки. При передачи колбека советую сразу писать стрелочную функцию: () => {}, а затем её заполняйте...у вас проблемы со скобками. */



//userForm.loginFormAction()


/*ApiConnector.login({login:'oleg@demo.ru', password: 'demo123'},response => console.log(responce));*/

/*loginFormAction(event) {
    event.preventDefault();
    this.loginFormCallback(this.getData(this.loginForm));
    this.loginForm.reset();
  }*/


/* Создайте объект класса `UserForm`.
3. Присвойте свойству `loginFormCallback` созданного объекта значение функции, которая в качестве аргумента принимает объект `data` (объект, который содержит логин и пароль, введённые в форму, и который будет передаваться внутри `loginFormAction`). 
    1. Функция должна выполнять запрос на сервер для попытки авторизации пользователя (авторизацию пользователя выполняйте с помощью `ApiConnector.login`).
    2. Передайте в запрос авторизации функцию, которая будет выполняться при попытке авторизации.
    2. Посмотрите в консоли, какой объект возвращает сервер.
    3. Проверьте успешность запроса.
    4. В случае успеха запроса обновите страницу (с помощью `location.reload();`).
    5. В случае провала запроса выведите ошибку в окно для ошибок.
4. Проделайте аналогичные действия со свойством `registerFormCallback`.
    1. Передайте запрос на регистрацию.
    2. Напишите колбек, который будет выполняться после запроса.
    3. Выведите ошибку или обновите страницу.
    
Как только получится залогиниться, вернуться на страницу входа / регистрации будет уже нельзя. Реализация возможности разлогиниться будет следующим этапом работы.*/