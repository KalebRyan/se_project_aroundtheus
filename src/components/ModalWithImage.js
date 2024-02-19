import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._image = this._modalElement.querySelector(".modal__preview-image");
    this._name = this._modalElement.querySelector(".modal__image-caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
