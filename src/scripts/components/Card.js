class Card {
    constructor({name, link, owner, _id, likes}, userId, templateSelector, handleCardClick, handleCardRemove, setLikeCallback) {
        this._name = name;
        this._link = link;
        this._ownerId = owner._id;
        this._cardId = _id;
        this._template = document.querySelector(templateSelector).content;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._userId = userId;
        this._likes = likes;
        this._isLiked = !!likes.find((likeObject) => likeObject._id === userId);
        this._removeCard = this._removeCard.bind(this);
        this._setLike = this._setLike.bind(this);
        this._setLikeCallback = setLikeCallback.bind(this);
    }

    _setLike(likes) {
        this._isLiked = !this._isLiked;
        this._toggleLikeButton();
        this._likeCounter.textContent = likes;
    }

    _toggleLikeButton() {
        this._likeButton.classList.toggle("card-item__button_active");
    }

    _removeCard() {
        this.card.remove();
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._setLikeCallback(this._cardId, this._isLiked, this._setLike));
        if (this._removeButton) {
            this._removeButton.addEventListener("click", () => this._handleCardRemove(this._cardId, this._removeCard));
        }
        this._cardImage.addEventListener("click", (event) => this._handleCardClick(event, this._name, this._link));
    }


    
    createCard() {
        this.card = this._template.querySelector(".card-item").cloneNode(true);
        this._likeButton = this.card.querySelector(".card-item__button_type_set-like");
        if (this._isLiked) {
            this._toggleLikeButton();
        }
        this._likeCounter = this.card.querySelector(".card-item__like-count");
        this._removeButton = this.card.querySelector(".card-item__button_type_remove-card");
        if (this._ownerId !== this._userId) {
            this._removeButton.remove();
        }
        this._cardImage = this.card.querySelector(".card-item__image");
        this._likeCounter.textContent = this._likes.length;

        this.card.querySelector(".card-item__name").textContent = this._name;
        this._cardImage.setAttribute("src", this._link);
        this._cardImage.setAttribute("alt", `Картинка "${this._name}"`);
        this._setEventListeners();
        return this.card;
    }
}

export default Card;
