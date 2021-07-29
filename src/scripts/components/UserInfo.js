class UserInfo {
    constructor(nameSelector, professionSelector) {
        this._nameInput = document.querySelector(nameSelector);
        this._professionInput = document.querySelector(professionSelector);
    }

    getUserInfo() {
        return {
            name: this._nameInput.textContent,
            profession: this._professionInput.textContent
        };
    }

    setUserInfo(name, profession) {
        this._nameInput.textContent = name;
        this._professionInput.textContent = profession;
    }
}

export default UserInfo;