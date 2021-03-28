let modalOverlay = document.querySelector('.modal-overlay');

let modalOverlayNameInput = modalOverlay.querySelector('.edit-form__input_name');
let modalOverlayProfessionInput = modalOverlay.querySelector('.edit-form__input_profession');

let closeModalButton = modalOverlay.querySelector('.modal-overlay__button_close-modal');
let editProfileButton = document.querySelector('.profile__button_edit');
let saveProfileSettingsButton = modalOverlay.querySelector('.edit-form__button_save');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const modalControl = (action) => {
    // make sure if modal is opened and close it if needed
    if (action === 'close' && modalOverlay.classList.contains('modal-overlay_open')) {
        modalOverlay.classList.remove('modal-overlay_open');
    // make sure if modal is closed and open it (this will prevent adding additional class accidentally)
    } else if (action === 'open' && !modalOverlay.classList.contains('modal-overlay_open')) {
        modalOverlay.classList.add('modal-overlay_open');
    }
};

// add open modal event listener
editProfileButton.addEventListener('click', (event) => {
    modalControl('open');
    console.log('target', event.target.value);
    let currentNameContent = profileName.textContent;
    let currentProfessionContent = profileProfession.textContent;
    
    console.log('name', currentNameContent);
    console.log('prof', currentProfessionContent);
    modalOverlayNameInput.setAttribute('value', currentNameContent ?? '');
    modalOverlayProfessionInput.setAttribute('value', currentProfessionContent ?? '');
});

// add close modal event listener
closeModalButton.addEventListener('click', (event) => {
    modalControl('close');
});

// add saveButton event listener
saveProfileSettingsButton.addEventListener('click', (event) => {
    const name = modalOverlayNameInput.value;
    const profession = modalOverlayProfessionInput.value;
    if (checkInputValue(name, profession)) {
        profileName.textContent = name;
        profileProfession.textContent = profession;
        modalControl('close');
    } else {
        // probably should notify user about wrong inputs somehow
        console.log('Non-valid Input of edit-form container');
    }
});

const checkInputValue = (value1, value2) => {
    // some placeholder checks
    if (value1 && value2) {
        return true;
    }
    return false;
}
