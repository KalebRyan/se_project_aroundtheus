export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Profile Modal
export const profileEditModal = document.querySelector("#profile__edit-modal");
export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileForm = document.forms["profile-form"];
export const closeButtons = document.querySelectorAll(".modal__close-button");
export const profileTitleInput = document.querySelector(
  ".modal__input_type_name"
);
export const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);
export const editAvatarButton = document.querySelector(
  "#profile__avatar-edit-button"
);

// Card Template
export const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Add Card Modal
export const addCardModal = document.querySelector("#card__add-modal");
export const addCardButton = document.querySelector("#profile__add-button");
export const cardForm = document.forms["card-form"];
export const cardDeleteButton = cardTemplate.querySelector(
  ".card__delete-button"
);
