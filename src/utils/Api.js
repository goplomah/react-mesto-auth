export class Api {
  constructor(data) {
    this._dataBase = data.dataBase;
    this._headers = data.headers;
  }

  _request(endpoint, option) {
    return fetch(`${this._dataBase + endpoint}`, option).then((res) =>
      this._checkResponse(res)
    );
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Упс... Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return this._request("users/me", { headers: this._headers });
  }

  getInitCard() {
    return this._request("cards", { headers: this._headers });
  }

  setUserInfo({ name, job }) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job,
      }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  addCard({ title, link }) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link,
      }),
    });
  }

  addLike(_id) {
    return this._request(`cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(_id) {
    return this._request(`cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    return isLiked ? this.addLike(_id) : this.deleteLike(_id);
  }

  removeCard(_id) {
    return this._request(`cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  dataBase: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "4cedf714-dd26-4078-b00f-7c3db0c68c43",
    "Content-Type": "application/json",
  },
});

export default api;
