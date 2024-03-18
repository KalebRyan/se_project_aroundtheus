import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileEditButton,
  profileForm,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  cardTemplate,
  addCardButton,
  cardForm,
  cardTitleInput,
  cardLinkInput,
} from "../utils/constants.js";
import Api from "../components/Api.js";

// API Calls
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "24d24150-f342-4b21-ba37-43c96c87f158",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    const cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const card = new Card(cardData, "#card__template", handleImageClick);
          cardSection.addItem(card.getCard());
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

// api
//   .getUserInfo()
//   .then((res) => {
//     userInfo.setUserInfo(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// api
//   .getInitialCards()
//   .then((res) => {
//     const cardSection = new Section(
//       {
//         items: res,
//         renderer: (cardData) => {
//           const cardElement = createCard(cardData);
//           cardSection.addItem(cardElement);
//         },
//       },
//       ".cards__list"
//     );
//     cardSection.renderItems(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const cardElement = createCard(cardData);
//       cardSection.addItem(cardElement);
//     },
//   },
//   ".cards__list"
// );

// cardSection.renderItems();

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
  avatarSelector: ".profile__avatar",
});

function fillProfileForm() {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.description;
}

// Handlers
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editModal.close();
}

function handleCardFormSubmit(data) {
  api
    .addCard(data)
    .then((res) => {
      const card = new Card(res, "#card__template", handleImageClick);
      cardList.prepend(card.getCard());
    })
    .catch((err) => {
      console.error(err);
    });
  // const name = data.title;
  // const link = data.link;
  // renderCard({ name, link });
  newCardModal.close();
}

function handleImageClick(cardData) {
  modalWithImage.open(cardData);
}

// Card Rendering
// function createCard(cardData) {
//   const card = new Card(cardData, "#card__template", handleImageClick);
//   return card.getCard();
// }

// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   cardSection.addItem(cardElement);
// }

// Event Listeners
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
