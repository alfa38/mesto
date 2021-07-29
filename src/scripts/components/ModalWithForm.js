import Modal from "./Modal.js";

class ModalWithForm extends Modal {
    constructor(props, formSubmitCallback) {
        super(props);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._modal.querySelector(".edit-form");
    }

    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        this._form = this._modal.querySelector(".edit-form");
        const inputs = this._form.querySelectorAll(".edit-form__input");

        return Array.from(inputs).map((node) => {
            return node.value;
        });
    }

    // Перезаписывает родительский метод setEventListeners.
    // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

    setEventListeners() {
        this._modal.addEventListener("click", this.handleOverlayClick.bind(this), false);
        const button = this._modal.querySelector(".modal-overlay__button_type_close-modal");
        button.addEventListener("click", () => this.closeModal());
        this._form.addEventListener("submit", (event) => {
            this._formSubmitCallback(event, this._getInputValues());
            this.closeModal();
        });
    }
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    
    closeModal() {
        this._modal.classList.remove("modal-overlay_open");
        document.removeEventListener("keydown", this._handleEscClose, false);
        this._form.reset();
    }
}

export default ModalWithForm;