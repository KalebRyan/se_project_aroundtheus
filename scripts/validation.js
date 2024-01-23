const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );

//   inputElement.classList.add(inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );

//   inputElement.classList.remove(inputErrorClass);
//   errorMessageElement.textContent = " ";
//   errorMessageElement.classList.remove(errorClass);
// }

// function checkInputValidity(formElement, inputElement, config) {
//   if (!inputElement.validity.valid) {
//     return showInputError(formElement, inputElement, config);
//   }
//   hideInputError(formElement, inputElement, config);
// }

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputElement) => inputElement.validity.valid);
// }

// function disableButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true;
// }

// function enableButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   if (hasInvalidInput(inputElements)) {
//     disableButton(submitButton, inactiveButtonClass);
//     return;
//   }
//   enableButton(submitButton, inactiveButtonClass);
// }

function setEventListeners(formElement, config) {
  const { inputSelector, submitButtonSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formElements = [...document.querySelectorAll(config.formSelector)];

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

enableValidation(config);
