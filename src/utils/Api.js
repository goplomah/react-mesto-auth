export class Api {
    constructor(data) {
        this._dataBase = data.dataBase;
        this._headers = data.headers;
    }

    _checkResponse(res) {
        if(res.ok) {return res.json();}
            return Promise.reject(`Упс... Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._dataBase}users/me`, {headers: this._headers})
        .then(res => this._checkResponse(res))
    }

    getInitCard() {
        return fetch(`${this._dataBase}cards`, {headers: this._headers}).then(res => this._checkResponse(res))
    }

    setUserInfo({name, job}) {
        return fetch(`${this._dataBase}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about: job
            })
        }).then(res => this._checkResponse(res))
    }

    updateAvatar({avatar}) {
        return fetch(`${this._dataBase}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(res => this._checkResponse(res))
}


    addCard({title, link}) {
        return fetch(`${this._dataBase}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link
            })
        }).then(res => this._checkResponse(res))
}

    addLike(_id) {
        return fetch(`${this._dataBase}cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(res => this._checkResponse(res))
    }
    
    deleteLike(_id) {
        return fetch(`${this._dataBase}cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(_id, isLiked) {
        return isLiked ? this.addLike(_id) : this.deleteLike(_id)
    }

    removeCard(_id) {
        return fetch(`${this._dataBase}cards/${_id}`, {
            method: "DELETE",
            headers: this._headers
         })
         .then(res => this._checkResponse(res))
    }
}

const api = new Api({
    dataBase: 'https://mesto.nomoreparties.co/v1/cohort-63/',
    headers: {
      authorization: "4cedf714-dd26-4078-b00f-7c3db0c68c43",
      "Content-Type": "application/json"
    }
  });   

export default api;