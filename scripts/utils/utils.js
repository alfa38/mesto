export const photoViewierOverlay = document.querySelector("#modal-photo-viewier");
const photoViewierImage = photoViewierOverlay.querySelector(".photo-viewier__image");
const photoViewierCaption = photoViewierOverlay.querySelector(".photo-viewier__caption");
export const closePhotoViewierButton = photoViewierOverlay.querySelector(".modal-overlay__button_type_close-modal");

// const onEscapeCloseModalHandler = (event, modal) => {
//     if (event.key === "Escape") {
//         closeModal(modal);
//     }
// };

const onOverlayClickHandler = (event) => {
    if (event.target.classList.contains("modal-overlay_open")) {
        closeModal(event.target);
    }
};

let openedModal = undefined;

const closeByEsc = (event) => {
    if (event.key === "Escape") {
        closeModal(openedModal);
    }
};

export const openModal = (modal) => {
    openedModal = modal;
    modal.classList.add("modal-overlay_open");
    modal.addEventListener("click", onOverlayClickHandler, false);
    document.addEventListener("keydown", closeByEsc, false);
};

export const closeModal = (modal) => {
    openedModal = undefined;
    modal.classList.remove("modal-overlay_open");
    modal.removeEventListener("click", onOverlayClickHandler, false);
    document.removeEventListener("keydown", closeByEsc, false);
};

export const openPhotoViewierModal = (name, link) => {
    photoViewierImage.setAttribute("src", link);
    photoViewierImage.setAttribute("alt", name);
    photoViewierCaption.textContent = name;
    openModal(photoViewierOverlay);
};