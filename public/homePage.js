let logoutButton = new LogoutButton();
logoutButton.action = (event) => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

let ratesBoard = new RatesBoard();
let timerId = setInterval(() => {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}, 1000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    //debugger;
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Пополнение счета успешно выполнено');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация успешно выполнена');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});


favoritesWidget.addUserCallback = ({
    id,
    name
}) => {
    ApiConnector.addUserToFavorites({
        id,
        name
    }, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Пользователь добавлен в избранные');
        } else {
            moneyManager.setMessage(false, response.error);

        }
    });
};

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Пользователь удален из избранного');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};


moneyManager.sendMoneyCallback = ({
    to,
    currency,
    amount
}) => {
    ApiConnector.transferMoney({
        to,
        currency,
        amount
    }, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод успешно выполнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};