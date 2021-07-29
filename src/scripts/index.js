import { FormValidator } from "./components/FormValidator.js";
import Card from "./components/Card.js";
import { selectors, initialCards, cardsContainerSelector } from "./constants.js";

import { cardItemSelector} from "./constants.js";

import Section from "./components/Section.js";
import PhotoViewierModal from "./components/PhotoViewierModal.js";
import UserInfo from "./components/UserInfo.js";
import ModalWithForm from "./components/ModalWithForm.js";

const addCardOverlay = document.querySelector("#modal-add-new-card");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
const addCardButton = document.querySelector(".profile__button_type_add-card");

const editProfileOverlay = document.querySelector("#modal-edit-profile");
const editProfileForm = editProfileOverlay.querySelector(".edit-form");
const editProfileButton = document.querySelector(".profile__button_type_edit-profile");

const addCardValidator = new FormValidator(selectors, addNewCardForm);
const editProfileValidator = new FormValidator(selectors, editProfileForm);

const handleCardClick = (event, name, link) => {
    event.preventDefault();
    photoViewierModal.openModal({name, link});
};


const rendererFunction = (item) => {
    return new Card(item, cardItemSelector, handleCardClick).createCard();
};

const submitAddNewCard = (event, [name, link]) => {
    event.preventDefault();
    cardSection.addItem({ name, link });
};

const submitEditProfileForm = (event, [name, profession]) => {
    event.preventDefault();
    userInfo.setUserInfo(name, profession);
};

const cardSection = new Section({ items: initialCards, renderer: rendererFunction }, cardsContainerSelector);

const editProfileModal = new ModalWithForm("#modal-edit-profile", submitEditProfileForm);
const addCardModal = new ModalWithForm("#modal-add-new-card", submitAddNewCard);
const photoViewierModal = new PhotoViewierModal("#modal-photo-viewier");

const userInfo = new UserInfo(".profile__name", ".profile__profession");

const initModalControls = () => {
    editProfileModal.setEventListeners();
    addCardModal.setEventListeners();
    photoViewierModal.setEventListeners();

    editProfileButton.addEventListener("click", () => {
        editProfileModal.openModal();
        editProfileValidator.resetForm();
    });
    addCardButton.addEventListener("click", () => {
        addCardValidator.resetForm();
        addCardModal.openModal();
    });

};


initModalControls();
cardSection.renderItems();

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
