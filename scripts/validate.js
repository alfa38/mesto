export const disableButton = (buttonElement, disabledClassName) => {
    buttonElement.classList.add(disabledClassName);
    buttonElement.setAttribute("disabled", true);
};

export const enableButton = (buttonElement, disabledClassName) => {
    buttonElement.classList.remove(disabledClassName);
    buttonElement.removeAttribute("disabled");
};

class FormValidator {
    constructor(options, formElement) {
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._form = formElement;

        this._formInputs = Array.from(formElement.querySelectorAll(options.inputSelector));
        this._formButton = formElement.querySelector(options.submitButtonSelector);
    }

    _validateInput(inputElement, errorField) {
        if (inputElement.validity.valid !== true) {
            errorField.textContent = inputElement.validationMessage;
            errorField.classList.add(this._errorClass);
            inputElement.classList.add(this._inputErrorClass);
        } else {
            errorField.textContent = "";
            errorField.classList.remove(this._errorClass);
            inputElement.classList.remove(this._inputErrorClass);
        }
    }

    _toggleButton() {
        if (this._formInputs.some((input) => {
            return input.validity.valid !== true;
        })) {
            disableButton(this._formButton, this._inactiveButtonClass);
        } else {
            enableButton(this._formButton, this._inactiveButtonClass);
        }
    }

    _inputValidationHandler(inputElement, errorField) {
        return () => {
            this._validateInput(inputElement, errorField);
            this._toggleButton();
        };
    }

    activateValidation() {
        this._formInputs.forEach((inputElement) => {
            const errorField = this._form.querySelector(`.${inputElement.id}-error`);
            inputElement.addEventListener("input", this._inputValidationHandler(inputElement, errorField));
        });
    }

    
}

export const initializeValidation = ( selectors ) => {
    const forms = Array.from(document.querySelectorAll(selectors.formSelector));
    forms.forEach((formElement) => {
        new FormValidator(selectors, formElement).activateValidation();
    });
};
