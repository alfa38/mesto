export class FormValidator {
    constructor(options, formElement) {
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputSelector = options.inputSelector;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._form = formElement;

        this._formInputs = Array.from(this._form.querySelectorAll(options.inputSelector));
        this._errorFields = Array.from(this._form.querySelectorAll(options.errorFieldClass));
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

    _disableButton() {
        this._formButton.classList.add(this._inactiveButtonClass);
        this._formButton.setAttribute("disabled", true);
    }
    
    _enableButton() {
        this._formButton.classList.remove(this._inactiveButtonClass);
        this._formButton.removeAttribute("disabled");
    }

    _toggleButton() {
        if (this._formInputs.some((input) => {
            return input.validity.valid !== true;
        })) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _inputValidationHandler(inputElement, errorField) {
        return () => {
            this._validateInput(inputElement, errorField);
            this._toggleButton();
        };
    }

    resetForm() {
        this._form.reset();
        this._formInputs.forEach((inputElement) => {
            inputElement.classList.remove(this._inputErrorClass);
        });
        this._errorFields.forEach((errorField) => {
            errorField.textContent = "";
        });
        this._toggleButton();
    }

    enableValidation() {
        this._formInputs.forEach((inputElement) => {
            const errorField = this._form.querySelector(`.${inputElement.id}-error`);
            inputElement.addEventListener("input", this._inputValidationHandler(inputElement, errorField));
        });
    }
}

