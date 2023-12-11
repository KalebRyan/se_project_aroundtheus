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

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileCloseButton = document.querySelector(
  "#profile-modal__close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const addCardButton = document.querySelector("#card__add-button");
const addCardModal = document.querySelector("#card__add-modal");
const addCardClosebutton = document.querySelector("#card-modal__close-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function openProfileEditModal() {
  openModal(profileEditModal);
  fillProfileForm();
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function closeProfileEditModal() {
  closeModal(profileEditModal);
}

function openAddCardModal() {
  openModal(addCardModal);
}

function closeAddCardModal() {
  closeModal(addCardModal);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileEditModal();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

profileEditButton.addEventListener("click", openProfileEditModal);
profileCloseButton.addEventListener("click", closeProfileEditModal);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardButton.addEventListener("click", openAddCardModal);
addCardClosebutton.addEventListener("click", closeAddCardModal);
