class UserInfo {
    // Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
    // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    // Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
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