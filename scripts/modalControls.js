
import { addNewCard } from "./card.js";
import { disableButton } from "./validate.js";
import { inputErrorVisibleClass, cardItemSelector} from "./constants.js";
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

export const openModal = (modal) => {
    modal.classList.add("modal-overlay_open");
    addOnClickCloseHandlerToOverlay(modal);
    addOnEscapeHandlerForOverlay();
};

export const closeModal = () => {
    const modal = document.querySelector(".modal-overlay_open");
    if (modal) {
        modal.classList.remove("modal-overlay_open");
        modal.removeEventListener("click", closeModalHandler, false);
        removeOnEscapeHandlerForOverlay();
    }   
};

const removeOnEscapeHandlerForOverlay = () => {
    document.removeEventListener("keydown", onEscapeCloseModalHandler);
};

const onEscapeCloseModalHandler = (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
};

const closeModalHandler = (event) => {
    if (event.target.classList.contains("modal-overlay_open")) {
        closeModal();
    }
};

const addOnClickCloseHandlerToOverlay = (modal) => {
    modal.addEventListener("click", closeModalHandler, false);
};

const addOnEscapeHandlerForOverlay = () => {
    document.addEventListener("keydown", onEscapeCloseModalHandler);
};

const saveChanges = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeModal();
};

const openEditProfileModal = () => {
    resetFormManually(editProfileForm);
    openModal(editProfileOverlay);
    modalOverlayNameInput.value = profileName.textContent ?? "";
    modalOverlayProfessionInput.value = profileProfession.textContent ?? "";
};

export const resetFormManually = (formElement) => {
    formElement.reset();
    const formInputs = Array.from(formElement.querySelectorAll(".edit-form__input"));
    formInputs.forEach((inputElement) => {
        inputElement.classList.remove(inputErrorVisibleClass);
    });
    Array.from(formElement.querySelectorAll(".edit-form__error")).forEach((errorField) => {
        errorField.textContent = "";
    });
    disableButton(formElement.querySelector(".edit-form__button"), "edit-form__button_disabled");
};

const openAddCardOverlay = () => {
    resetFormManually(addNewCardForm);
    openModal(addCardOverlay);
};

const addNewCardFromModal = (event) => {
    event.preventDefault();
    addNewCard({name: addCardNameInput.value, link: addCardSourceInput.value}, cardsContainer, cardItemSelector );
    closeModal();
};

export const openPhotoViewierModal = (name, link) => {
    photoViewierImage.setAttribute("src", link);
    photoViewierImage.setAttribute("alt", name);
    photoViewierCaption.textContent = name;
    openModal(photoViewierOverlay);
};

export const initModalControls = () => {
    closeEditProfileButton.addEventListener("click", closeModal);
    closeAddNewCardButton.addEventListener("click", closeModal);
    closePhotoViewierButton.addEventListener("click", closeModal);


    editProfileButton.addEventListener("click", openEditProfileModal);
    addCardButton.addEventListener("click", openAddCardOverlay);
    editProfileForm.addEventListener("submit", saveChanges);
    addNewCardForm.addEventListener("submit", addNewCardFromModal);
};
