import "./index.css";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import { selectors, initialCards, cardsContainerSelector } from "../scripts/constants.js";

import { cardItemSelector} from "../scripts/constants.js";

import Section from "../scripts/components/Section.js";
import PhotoViewierModal from "../scripts/components/PhotoViewierModal.js";
import UserInfo from "../scripts/components/UserInfo.js";
import ModalWithForm from "../scripts/components/ModalWithForm.js";

const addCardOverlay = document.querySelector("#modal-add-new-card");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
const addCardButton = document.querySelector(".profile__button_type_add-card");

const editProfileOverlay = document.querySelector("#modal-edit-profile");
const editProfileForm = editProfileOverlay.querySelector(".edit-form");
const editProfileNameInput = editProfileForm.querySelector(".edit-form__input_edit_name");
const editProfileProfessionInput = editProfileForm.querySelector(".edit-form__input_edit_profession");
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

console.log(editProfileForm);

const setEditProfileForm = ({name, profession}) => {
    editProfileNameInput.value = name;
    editProfileProfessionInput.value = profession;
};

const initModalControls = () => {
    editProfileModal.setEventListeners();
    addCardModal.setEventListeners();
    photoViewierModal.setEventListeners();

    editProfileButton.addEventListener("click", () => {
        editProfileValidator.resetForm();
        console.log(userInfo.getUserInfo());
        setEditProfileForm(userInfo.getUserInfo());
        editProfileModal.openModal();
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
