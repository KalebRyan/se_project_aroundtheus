import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector }, handleFormSubmit) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._modalElement.querySelector(".modal__form");
    this._saveButton = this._modalElement.querySelector(".modal__button");
    this._buttonText = this._saveButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._modalElement.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    isLoading
      ? (this._saveButton.textContent = loadingText)
      : (this._saveButton.textContent = this._buttonText);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
