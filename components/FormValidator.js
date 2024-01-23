export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement) {
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = " ";
    this._errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return _showInputError(inputElement);
    }
    _hideInputError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState(inputElements) {
    if (this._hasInvalidInput(inputElements)) {
      this._disableButton(this._submitButton, this._inactiveButtonClass);
      return;
    }
    this._enableButton(this._submitButton, this._inactiveButtonClass);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleButtonState(this._inputElements, submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

// const editFormValidator = new FormValidator(config, form);
// const addFormValidator = new FormValidator(config, form);
