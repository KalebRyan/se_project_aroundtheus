import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
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

const modalWithImage = new ModalWithImage({
  modalSelector: "#preview__image-modal",
});
modalWithImage.setEventListeners();

const editModal = new ModalWithForm(
  {
    modalSelector: "#profile__edit-modal",
  },
  handleProfileFormSubmit
);

editModal.setEventListeners();

const newCardModal = new ModalWithForm(
  {
    modalSelector: "#card__add-modal",
  },
  handleCardFormSubmit
);
newCardModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

userInfo.getUserInfo();

userInfo.setUserInfo({
  name: profileTitle.textContent,
  description: profileDescription.textContent,
});

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Handlers
function handleProfileFormSubmit(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.description;
  editModal.close();
}

function handleCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardList);
  newCardModal.close();
  cardForm.reset();
}

function handleImageClick(cardData) {
  modalWithImage.open(cardData);
}

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

profileEditButton.addEventListener("click", () => {
  editModal.open();
  fillProfileForm();
  formValidators[profileForm.getAttribute("name")].resetValidation();
});

addCardButton.addEventListener("click", () => {
  formValidators[cardForm.getAttribute("name")].resetValidation();
  newCardModal.open();
});

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
