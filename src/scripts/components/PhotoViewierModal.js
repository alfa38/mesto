import Modal from "./Modal.js";

class PhotoViewierModal extends Modal {
    constructor(props) {
        super(props);
        this._image = this._modal.querySelector(".photo-viewier__image");
        this._caption = this._modal.querySelector(".photo-viewier__caption");
    }

    openModal({name, link}) {
        this._image.setAttribute("src", link);
        this._image.setAttribute("alt", name);
        this._caption.textContent = name;
        super.openModal();
    }
}

export default PhotoViewierModal;