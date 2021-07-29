class Card {
    constructor({name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = document.querySelector(templateSelector).content;
        this._handleCardClick = handleCardClick;
    }

    _setLike() {
        return () => this._likeButton.classList.toggle("card-item__button_active");
    }

    _setEventListeners() {
        // Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
        // Эта функция должна открывать попап с картинкой при клике на карточку.
        this._likeButton.addEventListener("click", this._setLike(this._likeButton));
        this._removeButton.addEventListener("click", () => this._newCard.remove());
        // this._cardImage.addEventListener("click", () => openPhotoViewierModal(this._name, this._link));
        this._cardImage.addEventListener("click", (event) => this._handleCardClick(event, this._name, this._link));
    }


    
    createCard() {
        this._newCard = this._template.querySelector(".card-item").cloneNode(true);
        this._likeButton = this._newCard.querySelector(".card-item__button_type_set-like");
        this._removeButton = this._newCard.querySelector(".card-item__button_type_remove-card");
        this._cardImage = this._newCard.querySelector(".card-item__image");

        this._newCard.querySelector(".card-item__name").textContent = this._name;
        this._cardImage.setAttribute("src", this._link);
        this._cardImage.setAttribute("alt", `Картинка "${this._name}"`);
        this._setEventListeners();
        return this._newCard;
    }
}

export default Card;
