class Modal {
    constructor(modalSelector) {
        this._modal = document.querySelector(modalSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    openModal() {
        this._modal.classList.add("modal-overlay_open");
        document.addEventListener("keydown", this._handleEscClose, false);
    }

    closeModal() {
        this._modal.classList.remove("modal-overlay_open");
        document.removeEventListener("keydown", this._handleEscClose, false);
    }

    handleOverlayClick(event) {
        if (event.target.classList.contains("modal-overlay_open")) {
            this.closeModal();
        }
    }
    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.closeModal();
        }
    }

    setEventListeners() {
        this._modal.addEventListener("click", this.handleOverlayClick.bind(this), false);
        const button = this._modal.querySelector(".modal-overlay__button_type_close-modal");
        button.addEventListener("click", () => this.closeModal());
    }
}

export default Modal;