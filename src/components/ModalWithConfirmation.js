import Modal from "./Modal";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }, handleFormSubmit) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalElement.querySelector(".modal__form");
    this._saveButton = this._modalElement.querySelector(".modal__button");
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Saved.";
    }
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}
