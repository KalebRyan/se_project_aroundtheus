// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
//   },
// ];

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditModal = document.querySelector("#profile__edit-modal");
export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileForm = document.forms["profile-form"];
export const closeButtons = document.querySelectorAll(".modal__close-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector(
  ".modal__input_type_name"
);
export const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);

export const cardList = document.querySelector(".cards__list");

// Card Template
export const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Add Card Modal
export const addCardModal = document.querySelector("#card__add-modal");
export const addCardButton = document.querySelector("#profile__add-button");
export const cardForm = document.forms["card-form"];
export const cardTitleInput = cardForm.querySelector(
  ".modal__input_type_title"
);
export const cardLinkInput = cardForm.querySelector(".modal__input_type_link");

// Preview Image Modal
export const previewImageModal = document.querySelector(
  "#preview__image-modal"
);
export const previewImage = previewImageModal.querySelector(
  ".modal__preview-image"
);
export const previewImageCaption = previewImageModal.querySelector(
  ".modal__image-caption"
);
