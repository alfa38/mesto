import { FormValidator } from "./FormValidation.js";
import { Card } from "./card.js";
import { selectors, initialCards } from "./constants.js";

import { cardItemSelector} from "./constants.js";
import { cardsContainer } from "./constants.js";

const photoViewierOverlay = document.querySelector("#modal-photo-viewier");
const photoViewierImage = photoViewierOverlay.querySelector(".photo-viewier__image");
const photoViewierCaption = photoViewierOverlay.querySelector(".photo-viewier__caption");
const closePhotoViewierButton = photoViewierOverlay.querySelector(".modal-overlay__button_type_close-modal");

const addCardOverlay = document.querySelector("#modal-add-new-card");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
const addCardNameInput = addCardOverlay.querySelector(".edit-form__input_edit_name");
const addCardSourceInput = addCardOverlay.querySelector(".edit-form__input_edit_img-source");
const closeAddNewCardButton = addCardOverlay.querySelector(".modal-overlay__button_type_close-modal");
const addCardButton = document.querySelector(".profile__button_type_add-card");

const editProfileOverlay = document.querySelector("#modal-edit-profile");
const modalOverlayNameInput = editProfileOverlay.querySelector(".edit-form__input_edit_name");
const modalOverlayProfessionInput = editProfileOverlay.querySelector(".edit-form__input_edit_profession");
const closeEditProfileButton = editProfileOverlay.querySelector(".modal-overlay__button_type_close-modal");
const editProfileForm = editProfileOverlay.querySelector(".edit-form");
const editProfileButton = document.querySelector(".profile__button_type_edit-profile");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const addCardValidator = new FormValidator(selectors, addNewCardForm);
const editProfileValidator = new FormValidator(selectors, editProfileForm);

export const openModal = (modal) => {
    modal.classList.add("modal-overlay_open");
    addOnClickCloseHandlerToOverlay(modal);
    addOnEscapeHandlerForOverlay(modal);
};

export const closeModal = (modal) => {
    modal.classList.remove("modal-overlay_open");
    modal.removeEventListener("click", onEscapeCloseModalHandler, false);
    removeOnEscapeHandlerForOverlay();
};

const removeOnEscapeHandlerForOverlay = () => {
    document.removeEventListener("keydown", onEscapeCloseModalHandler);
};

const onEscapeCloseModalHandler = (event, modal) => {
    if (event.key === "Escape") {
        closeModal(modal);
    }
};

const onOverlayClickHandler = (event) => {
    if (event.target.classList.contains("modal-overlay_open")) {
        closeModal(event.target);
    }
};

const addOnClickCloseHandlerToOverlay = (modal) => {
    modal.addEventListener("click", onOverlayClickHandler, false);
};

const addOnEscapeHandlerForOverlay = (modal) => {
    document.addEventListener("keydown", (event) => onEscapeCloseModalHandler(event, modal));
};

const submitEditProfileForm = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeModal(editProfileOverlay);
};

const openEditProfileModal = () => {
    editProfileValidator.resetForm();
    openModal(editProfileOverlay);
    modalOverlayNameInput.value = profileName.textContent ?? "";
    modalOverlayProfessionInput.value = profileProfession.textContent ?? "";
};



const openAddCardOverlay = () => {
    addCardValidator.resetForm();
    openModal(addCardOverlay);
};

const addNewCardFromModal = (event) => {
    event.preventDefault();
    addNewCard({name: addCardNameInput.value, link: addCardSourceInput.value}, cardsContainer, cardItemSelector );
    closeModal(addCardOverlay);
};

export const openPhotoViewierModal = (name, link) => {
    photoViewierImage.setAttribute("src", link);
    photoViewierImage.setAttribute("alt", name);
    photoViewierCaption.textContent = name;
    openModal(photoViewierOverlay);
};

export const initModalControls = () => {
    closeEditProfileButton.addEventListener("click", () => closeModal(editProfileOverlay));
    closeAddNewCardButton.addEventListener("click", () => closeModal(addCardOverlay));
    closePhotoViewierButton.addEventListener("click", () => closeModal(photoViewierOverlay));


    editProfileButton.addEventListener("click", openEditProfileModal);
    addCardButton.addEventListener("click", openAddCardOverlay);
    editProfileForm.addEventListener("submit", submitEditProfileForm);
    addNewCardForm.addEventListener("submit", addNewCardFromModal);
};

export const addNewCard = (cardData, container, cardItemSelector) => {
    container.prepend(new Card(cardData, cardItemSelector).createCard());
};

export const initializeCards = () => {
    initialCards.forEach((cardData) => {
        addNewCard(cardData, cardsContainer, cardItemSelector);
    });
};

initializeCards();
initModalControls();

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
