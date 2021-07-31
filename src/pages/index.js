import "./index.css";

import MestoAPI from "../scripts/api/api.js";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import { selectors, initialCards, cardsContainerSelector, apiOptions } from "../scripts/constants.js";

import { cardItemSelector} from "../scripts/constants.js";

import Section from "../scripts/components/Section.js";
import PhotoViewierModal from "../scripts/components/PhotoViewierModal.js";
import UserInfo from "../scripts/components/UserInfo.js";
import ModalWithForm from "../scripts/components/ModalWithForm.js";

const addCardOverlay = document.querySelector("#modal-add-new-card");
const addNewCardForm = addCardOverlay.querySelector(".edit-form");
const addCardButton = document.querySelector(".profile__button_type_add-card");
const avatarContainer = document.querySelector(".profile__avatar-container");
const userAvatar = document.querySelector(".profile__avatar");

const editProfileOverlay = document.querySelector("#modal-edit-profile");
const editProfileForm = editProfileOverlay.querySelector(".edit-form");
const editProfileNameInput = editProfileForm.querySelector(".edit-form__input_edit_name");
const editProfileProfessionInput = editProfileForm.querySelector(".edit-form__input_edit_profession");
const editProfileButton = document.querySelector(".profile__button_type_edit-profile");

const updateAvatarOverlay = document.querySelector("#modal-update-avatar");
const updateAvatarForm = updateAvatarOverlay.querySelector(".edit-form");

const addCardValidator = new FormValidator(selectors, addNewCardForm);
const editProfileValidator = new FormValidator(selectors, editProfileForm);
const updateAvatarValidator = new FormValidator(selectors, updateAvatarForm);

const API = new MestoAPI(apiOptions);

const submitAddNewCard = (event, [name, link]) => {
    event.preventDefault();
    return API.addNewCard(name, link).then((cardData) => {
        cardSection.addItem(cardData);
    }).catch((error) => {
        console.log(`addNewCardApiError: ${error}`);
    });
};

const submitEditProfileForm = (event, [name, profession]) => {
    event.preventDefault();
    return API.updateProfile({name, profession}).then((userData) => {
        userInfo.setUserInfo(userData);
    }).catch((error) => {
        console.log(`APIUpdateProfile: ${error}`);
    });
};

let cardToRemove = "";

let cardRemoveCallback = () => {
    return undefined;
};

const handleCardClick = (event, name, link) => {
    event.preventDefault();
    photoViewierModal.openModal({name, link});
};

const handleCardRemove = (cardId, removeCallBack) => {
    cardRemoveCallback = removeCallBack;
    cardToRemove = cardId;
    confirmDeleteModal.openModal();
};

const submitDeleteCard = (event) => {
    event.preventDefault();
    return API.deleteCard(cardToRemove).then(() => {
        cardRemoveCallback();
    }).catch((error) => {
        console.log(error);
    });
};

const submitUpdateAvatar = (event, [newUrl]) => {
    event.preventDefault();
    return API.updateAvatar(newUrl).then(({avatar}) => {
        userAvatar.src = avatar;
    }).catch((error) => {
        console.log(error);
    });
};

const editProfileModal = new ModalWithForm("#modal-edit-profile", submitEditProfileForm);
const addCardModal = new ModalWithForm("#modal-add-new-card", submitAddNewCard);
const confirmDeleteModal = new ModalWithForm("#modal-confirm-delete", submitDeleteCard);
const updateAvatarModal = new ModalWithForm("#modal-update-avatar", submitUpdateAvatar);
const photoViewierModal = new PhotoViewierModal("#modal-photo-viewier");

let userInternalId = "";

const setLikeCallback = (cardId, isLiked, setLike) => {
    if (isLiked === true) {
        API.unlike(cardId).then((data) => {
            setLike(data.likes.length);
        }).catch((error) => {
            console.log(error);
        });
    } else {
        API.like(cardId).then((data) => {
            setLike(data.likes.length);
        }).catch((error) => {
            console.log(error);
        });
    }
};

const rendererFunction = (item) => {
    return new Card(item, userInternalId, cardItemSelector, handleCardClick, handleCardRemove, setLikeCallback).createCard();
};

const userInfo = new UserInfo(".profile__name", ".profile__profession");

const initUser = () => {
    API.getUserInfo().then((userData) => {
        userInfo.setUserInfo(userData);
        userAvatar.src = userData.avatar;
        userInternalId = userData._id;
    }).catch((error) => {
        console.log(`getUserInfoError: ${error}`);
        userInfo.setUserInfo({name: "Default", about: "User"});
        userAvatar.attributes.src = "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg";
    }).finally(() => {
        getInitialCards();
    });
};

const getInitialCards = () => {
    API.getInitialCards().then((cardsData) => {
        console.log("cardsData", cardsData);
        cardSection.setItems(cardsData);
    }).catch((error) => {
        console.log(`getInitialCardsError: ${error}`);
        cardSection.setItems(initialCards);
    });
};

initUser();

const cardSection = new Section({ items: [], renderer: rendererFunction }, cardsContainerSelector);



const setEditProfileForm = ({name, profession}) => {
    editProfileNameInput.value = name;
    editProfileProfessionInput.value = profession;
};

const initModalControls = () => {
    editProfileModal.setEventListeners();
    addCardModal.setEventListeners();
    photoViewierModal.setEventListeners();
    confirmDeleteModal.setEventListeners();
    updateAvatarModal.setEventListeners();

    editProfileButton.addEventListener("click", () => {
        editProfileValidator.resetForm();
        setEditProfileForm(userInfo.getUserInfo());
        editProfileModal.openModal();
    });
    addCardButton.addEventListener("click", () => {
        addCardValidator.resetForm();
        addCardModal.openModal();
    });

    avatarContainer.addEventListener("click", () => {
        updateAvatarValidator.resetForm();
        updateAvatarModal.openModal();
    });
};


initModalControls();
cardSection.renderItems();

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
updateAvatarValidator.enableValidation();
