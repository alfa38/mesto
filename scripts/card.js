import { openPhotoViewierModal } from "./utils/utils.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
    }

    _setLike() {
        return () => this._likeButton.classList.toggle("card-item__button_active");
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", this._setLike(this._likeButton));
        this._removeButton.addEventListener("click", () => this._newCard.remove());
        this._cardImage.addEventListener("click", () => openPhotoViewierModal(this._name, this._link));
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
