import Modal from "./Modal.js";

class ModalWithForm extends Modal {
    constructor(props, formSubmitCallback) {
        super(props);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._modal.querySelector(".edit-form");
    }

    _getInputValues() {
        this._form = this._modal.querySelector(".edit-form");
        const inputs = this._form.querySelectorAll(".edit-form__input");

        return Array.from(inputs).map((node) => {
            return node.value;
        });
    }

    setEventListeners() {
        this._modal.addEventListener("click", this.handleOverlayClick.bind(this), false);
        const button = this._modal.querySelector(".modal-overlay__button_type_close-modal");
        button.addEventListener("click", () => this.closeModal());
        this._form.addEventListener("submit", (event) => {
            this._formSubmitCallback(event, this._getInputValues());
            this.closeModal();
        });
    }
    
    closeModal() {
        this._modal.classList.remove("modal-overlay_open");
        document.removeEventListener("keydown", this._handleEscClose, false);
        this._form.reset();
    }
}

export default ModalWithForm;