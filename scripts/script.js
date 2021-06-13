let modalOverlay = document.querySelector('.modal-overlay');

let modalOverlayNameInput = modalOverlay.querySelector('.edit-form__input_edit_name');
let modalOverlayProfessionInput = modalOverlay.querySelector('.edit-form__input_edit_profession');

let closeModalButton = modalOverlay.querySelector('.modal-overlay__button_close_modal');
let editProfileButton = document.querySelector('.profile__button_edit_profile');
let saveProfileSettingForm = modalOverlay.querySelector('.edit-form');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let modalControl = () => {
        modalOverlay.classList.toggle('modal-overlay_open');
    }

let openModal = () => {
    modalOverlay.classList.add('modal-overlay_open');
}

let closeModal = () => {
    modalOverlay.classList.remove('modal-overlay_open');
}
// add open modal event listener
let editProfile = () => {
    openModal();
    modalOverlayNameInput.setAttribute('value', profileName.textContent ?? '');
    modalOverlayProfessionInput.setAttribute('value', profileProfession.textContent ?? '');
}

let saveChanges = (event) => {
    event.preventDefault();
    profileName.textContent = modalOverlayNameInput.value;
    profileProfession.textContent = modalOverlayProfessionInput.value;
    closeModal();
}
editProfileButton.addEventListener('click', editProfile);

closeModalButton.addEventListener('click', closeModal);

saveProfileSettingForm.addEventListener('submit', saveChanges);
