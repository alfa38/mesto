
const selectors = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__button",
    inactiveButtonClass: "edit-form__button_disabled",
    inputErrorClass: "edit-form__input_error",
    errorClass: "edit-form__error_visible"
};

const validateInput = (inputElement, errorField, selectors) => {
    if (inputElement.validity.valid !== true) {
        errorField.textContent = inputElement.validationMessage;
        errorField.classList.add(selectors.errorClass);
        inputElement.classList.add(selectors.inputErrorClass);
    } else {
        errorField.textContent = "";
        errorField.classList.remove(selectors.errorClass);
        inputElement.classList.remove(selectors.inputErrorClass);
    }
};


const toggleButton = (listOfInputs, button) => {
    if (listOfInputs.some((inputElement) => {
        return inputElement.validity.valid !== true; 
    })) {
        button.classList.add(selectors.inactiveButtonClass);
    } else {
        button.classList.remove(selectors.inactiveButtonClass);
    }
};

const validateInputEvent = (inputElement, errorField, formInputs, formButton, selectors) => {
    validateInput(inputElement, errorField, selectors);
    toggleButton(formInputs, formButton, selectors.inactiveButtonClass);
};

const enableValidation = ( selectors ) => {
    const forms = Array.from(document.querySelectorAll(selectors.formSelector));
    forms.forEach((formElement) => {
        const formInputs = Array.from(formElement.querySelectorAll(selectors.inputSelector));
        const formButton = formElement.querySelector(selectors.submitButtonSelector);

        formInputs.forEach((inputElement) => {
            const errorField = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.addEventListener("input", () => validateInputEvent(inputElement, errorField, formInputs, formButton, selectors));
        });
    });
};

enableValidation(selectors); 
