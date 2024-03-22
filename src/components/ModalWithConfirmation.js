import Modal from "./Modal";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }, handleFormSubmit) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalElement.querySelector(".modal__form");
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
