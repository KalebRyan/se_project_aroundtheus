import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

// Profile Edit Modal
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileForm = document.forms["profile-form"];
const closeButtons = document.querySelectorAll(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);

// Card List
const cardList = document.querySelector(".cards__list");

// Card Template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Add Card Modal
const addCardModal = document.querySelector("#card__add-modal");
const addCardButton = document.querySelector("#profile__add-button");
const cardForm = document.forms["card-form"];
const cardTitleInput = cardForm.querySelector(".modal__input_type_title");
const cardLinkInput = cardForm.querySelector(".modal__input_type_link");

// Preview Image Modal
const previewImageModal = document.querySelector("#preview__image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageCaption = previewImageModal.querySelector(
  ".modal__image-caption"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOutside);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeModalOutside);
}

function closeModalEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModalOutside(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardList);
  closeModal(addCardModal);
  cardForm.reset();
}

function handleImageClick(cardData) {
  openModal(previewImageModal);
  previewImage.src = cardData._link;
  previewImage.alt = cardData._name;
  previewImageCaption.textContent = cardData._name;
}

function renderCard(cardData, list) {
  const card = new Card(cardData, "#card__template", handleImageClick);
  const cardElement = card.getCard();
  list.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileForm();
});

addCardButton.addEventListener("click", () => openModal(addCardModal));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
