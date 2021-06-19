const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];

const cardsContainer = document.querySelector(".cards-container");

const addCardButton = document.querySelector(".profile__button_type_add-card");
const addCardOverlay = document.querySelector("#modal-add-new-card");
const addCardNameInput = addCardOverlay.querySelector(".edit-form__input_edit_name");
const addCardSourceInput = addCardOverlay.querySelector(".edit-form__input_edit_img-source");
const closeAddNewCardButton = addCardOverlay.querySelector(".modal-overlay__button_type_close-modal");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
const addNewCardSaveButton = addCardOverlay.querySelector(".edit-form__button_type_add-card");

const editProfileButton = document.querySelector(".profile__button_type_edit-profile");
const editProfileOverlay = document.querySelector("#modal-edit-profile");
const modalOverlayNameInput = editProfileOverlay.querySelector(".edit-form__input_edit_name");
const modalOverlayProfessionInput = editProfileOverlay.querySelector(".edit-form__input_edit_profession");
const closeEditProfileButton = editProfileOverlay.querySelector(".modal-overlay__button_type_close-modal");
const saveProfileSettingForm = editProfileOverlay.querySelector(".edit-form");

const photoViewierOverlay = document.querySelector("#modal-photo-viewier");
const closePhotoViewierButton = photoViewierOverlay.querySelector(".modal-overlay__button_type_close-modal");
const photoViewierImage = photoViewierOverlay.querySelector(".photo-viewier__image");
const photoViewierCaption = photoViewierOverlay.querySelector(".photo-viewier__caption");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const templateCard = document.querySelector("#card-item-template").content;

const setLike = (button) => () => button.classList.toggle("card-item__button_active");
const removeCard = (card) => () => card.remove();

const createCard = (name, link) => {
    const newCard = templateCard.querySelector(".card-item").cloneNode(true);
    const likeButton = newCard.querySelector(".card-item__button_type_set-like");
    const removeButton = newCard.querySelector(".card-item__button_type_remove-card");
    const cardImage = newCard.querySelector(".card-item__image");

    newCard.querySelector(".card-item__name").textContent = name;
    cardImage.setAttribute("src", link);
    cardImage.setAttribute("alt", `Картинка "${name}"`);

    likeButton.addEventListener("click", setLike(likeButton));
    removeButton.addEventListener("click", removeCard(newCard));
    cardImage.addEventListener("click", () => openPhotoViewierModal(name, link));
    return newCard;
};

const addNewCard = (name, link) => {
    cardsContainer.prepend(createCard(name, link));
};

const openModal = (modal) => {
    modal.classList.add("modal-overlay_open");
};
const closeModal = (modal) => {
    modal.classList.remove("modal-overlay_open");
};

const openEditProfileModal = () => {
    openModal(editProfileOverlay);
    modalOverlayNameInput.value = profileName.textContent ?? "";
    modalOverlayProfessionInput.value = profileProfession.textContent ?? "";
};

const openPhotoViewierModal = (name, link) => {
    photoViewierImage.setAttribute("src", link);
    photoViewierImage.setAttribute("alt", name);
    photoViewierCaption.textContent = name;
    openModal(photoViewierOverlay);
};

const saveChanges = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeModal(editProfileOverlay);
};

const addNewCardFromModal = (event) => {
    event.preventDefault();
    addNewCard(addCardNameInput.value, addCardSourceInput.value);
    addNewCardForm.reset();
    addNewCardSaveButton.classList.add("edit-form__button_disabled");
    closeModal(addCardOverlay);
};

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const modal = document.querySelector(".modal-overlay_open");
        if (modal) {
            closeModal(modal);
        }
    }
});

const closeModalHandler = (event) => {
    if (event.target.classList.contains("modal-overlay_open")) {
        event.target.classList.remove("modal-overlay_open");
    }
};

editProfileButton.addEventListener("click", openEditProfileModal);
addCardButton.addEventListener("click", () => openModal(addCardOverlay));

closeEditProfileButton.addEventListener("click", () => closeModal(editProfileOverlay));
closeAddNewCardButton.addEventListener("click", () => closeModal(addCardOverlay));
closePhotoViewierButton.addEventListener("click", () => closeModal(photoViewierOverlay));

saveProfileSettingForm.addEventListener("submit", saveChanges);
addNewCardForm.addEventListener("submit", addNewCardFromModal);

editProfileOverlay.addEventListener("click", closeModalHandler);
addCardOverlay.addEventListener("click", closeModalHandler);
photoViewierOverlay.addEventListener("click", closeModalHandler);

initialCards.forEach((cardData) => {
    addNewCard(cardData.name, cardData.link);
});
