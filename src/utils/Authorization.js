class Authorization {
    constructor({dataBase}) {
        this._dataBase = dataBase;
    }

    _checkResponse(res) {
        if(res.ok) {return res.json();}
            return Promise.reject(`Упс... Ошибка: ${res.status}`);
    }

    registration(password, email) {
        return fetch(`${this._dataBase}/signup`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => this._checkResponse(res))
    }

    login(password, email) {
        return fetch(`${this._dataBase}/signin`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                password,
                email
            }),
        }).then(res => this._checkResponse(res))
    }

    checkToken(jwt) {
        return fetch(`${this._dataBase}/users/me`, {
            method: 'GET',
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`,}
        }).then(res => this._checkResponse(res))
    }
}

const authorization = new Authorization({ dataBase: "https://auth.nomoreparties.co" });
export default authorization;