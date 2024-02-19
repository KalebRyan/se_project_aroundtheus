import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalElement.querySelector(".modal__form");
  }

  close() {
    super.close();
    this._form.reset();
  }
}
