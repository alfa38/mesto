import { openPhotoViewierModal } from "./modalControls.js";
import { initialCards, cardsContainer, cardItemSelector } from "./constants.js";

export const addNewCard = (cardData, container, cardItemSelector) => {
    container.prepend(new DefaultCard(cardData, cardItemSelector).createCard());
};

export class DefaultCard {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
    }

    _setLike(buttonElement) {
        return () => buttonElement.classList.toggle("card-item__button_active");
    }
    _removeCardHandler(cardElement) {
        return () => cardElement.remove();
    }

    createCard() {
        const newCard = this._template.querySelector(".card-item").cloneNode(true);
        const likeButton = newCard.querySelector(".card-item__button_type_set-like");
        const removeButton = newCard.querySelector(".card-item__button_type_remove-card");
        const cardImage = newCard.querySelector(".card-item__image");

        newCard.querySelector(".card-item__name").textContent = this._name;
        cardImage.setAttribute("src", this._link);
        cardImage.setAttribute("alt", `Картинка "${this._name}"`);

        likeButton.addEventListener("click", this._setLike(likeButton));
        removeButton.addEventListener("click", this._removeCardHandler(newCard));
        cardImage.addEventListener("click", () => openPhotoViewierModal(this._name, this._link));
        return newCard;
    }
}

export const initializeCards = () => {
    initialCards.forEach((cardData) => {
        addNewCard(cardData, cardsContainer, cardItemSelector);
    });
};
