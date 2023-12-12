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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);

// Card List
const cardListEl = document.querySelector(".cards__list");

// Card Template
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Add Card Modal
const addCardModal = document.querySelector("#card__add-modal");
const addCardButton = document.querySelector("#card__add-button");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardLinkInput = addCardForm.querySelector(".modal__input_type_link");

// Open and Close Modal Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

// Form Listeners
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

// Build Cards
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const likeButton = document.querySelectorAll(".card__like-button");
likeButton.forEach((likeButton) => {
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileForm();
});
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
