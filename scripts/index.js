import { FormValidator } from "./FormValidation.js";
import { Card } from "./card.js";
import { selectors, initialCards } from "./constants.js";

import { cardItemSelector} from "./constants.js";
import { cardsContainer } from "./constants.js";

import { openModal, closeModal, photoViewierOverlay, closePhotoViewierButton } from "./utils/utils.js";

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

const initModalControls = () => {
    closeEditProfileButton.addEventListener("click", () => closeModal(editProfileOverlay));
    closeAddNewCardButton.addEventListener("click", () => closeModal(addCardOverlay));
    closePhotoViewierButton.addEventListener("click", () => closeModal(photoViewierOverlay));

    editProfileButton.addEventListener("click", openEditProfileModal);
    addCardButton.addEventListener("click", openAddCardOverlay);
    editProfileForm.addEventListener("submit", submitEditProfileForm);
    addNewCardForm.addEventListener("submit", addNewCardFromModal);
};

const addNewCard = (cardData, container, cardItemSelector) => {
    container.prepend(new Card(cardData, cardItemSelector).createCard());
};

const initializeCards = () => {
    initialCards.forEach((cardData) => {
        addNewCard(cardData, cardsContainer, cardItemSelector);
    });
};

initializeCards();
initModalControls();

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
