import Modal from "./Modal.js";

class ModalWithForm extends Modal {
    constructor(props, formSubmitCallback) {
        super(props);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._modal.querySelector(".edit-form");
        this._inputs = this._form.querySelectorAll(".edit-form__input");
        this._button = this._form.querySelector(".edit-form__button");
        this._buttonText = this._button.textContent;

    }

    _getInputValues() {
        return Array.from(this._inputs).map((node) => {
            return node.value;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            this._button.textContent = "Сохранение...";
            this._formSubmitCallback(event, this._getInputValues());
        });
    }

    openModal() {
        super.openModal();
        this._button.textContent = this._buttonText;
    }

    closeModal() {
        super.closeModal();
        this._form.reset();
    }
}

export default ModalWithForm;