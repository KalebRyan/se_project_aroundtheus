import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import {
  initialCards,
  config,
  profileEditModal,
  profileEditButton,
  profileForm,
  closeButtons,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  cardTemplate,
  addCardModal,
  addCardButton,
  cardForm,
  cardTitleInput,
  cardLinkInput,
  previewImageModal,
  previewImage,
  previewImageCaption,
} from "../utils/constants.js";

// Modal Functions
// (function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalEscape);
//   modal.addEventListener("mousedown", closeModalOutside);
// })();

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalEscape);
//   modal.removeEventListener("mousedown", closeModalOutside);
// }

// function closeModalEscape(e) {
//   if (e.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closeModal(modal);
//   }
// }

// function closeModalOutside(e) {
//   if (e.target === e.currentTarget) {
//     closeModal(e.currentTarget);
//   }
// }

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

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Card Rendering
function createCard(cardData) {
  const card = new Card(cardData, "#card__template", handleImageClick);
  return card.getCard();
}

function renderCard(cardData, list) {
  const cardElement = createCard(cardData);
  list.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));

// Event Listeners
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileForm();
  formValidators[profileForm.getAttribute("name")].resetValidation();
});

addCardButton.addEventListener("click", () => {
  formValidators[cardForm.getAttribute("name")].resetValidation();
  openModal(addCardModal);
});

// Instantiations
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const previewModal = new ModalWithImage(previewImageModal);

previewModal.setEventListeners();

// Form Validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
