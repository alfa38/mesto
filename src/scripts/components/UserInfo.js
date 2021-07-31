
class UserInfo {
    constructor(nameSelector, professionSelector) {
        this._nameInput = document.querySelector(nameSelector);
        this._professionInput = document.querySelector(professionSelector);
        this._userId = "";
    }

    getUserInfo() {
        return {
            name: this._nameInput.textContent,
            profession: this._professionInput.textContent
        };
    }

    setUserInfo(data) {
        this._nameInput.textContent = data.name;
        this._professionInput.textContent = data.about;
        this._userId = data._id;
    }

    getUserId() {
        return this._userId;
    }
}

export default UserInfo;