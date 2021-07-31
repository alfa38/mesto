class MestoAPI {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._processResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._processResponse);
    }
    

    updateProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.profession,
            })
        }).then(this._processResponse);
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name, link
            })
        }).then(this._processResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._processResponse);
    }

    like(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._processResponse);
    }

    unlike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._processResponse);
    }

    updateAvatar(newLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: newLink,
            })
        }).then(this._processResponse);
    }
}

export default MestoAPI;