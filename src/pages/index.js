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
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

// User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

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
          const card = new Card(
            cardData,
            "#card__template",
            handleImageClick,
            handleDeleteClick,
            handleLikeClick
          );
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

// Modals
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

const newConfirmationModal = new ModalWithConfirmation(
  {
    modalSelector: "#delete__card-modal",
  },
  handleFormSubmit
);

newConfirmationModal.setEventListeners();

// const editAvatarModal = new ModalWithForm(
//   {
//     modalSelector: "#avatar__edit-modal",
//   },
//   handleFormSubmit
// );

// editAvatarModal.setEventListeners();

function fillProfileForm() {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.description;
}

// Handlers
function handleImageClick(cardData) {
  modalWithImage.open(cardData);
}

function handleProfileFormSubmit(data) {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.error(err);
    });
  editModal.close();
}

function handleCardFormSubmit(data) {
  api
    .addCard(data)
    .then((res) => {
      const card = new Card(
        res,
        "#card__template",
        handleImageClick,
        handleDeleteClick,
        handleLikeClick
      );
      cardList.prepend(card.getCard());
    })
    .catch((err) => {
      console.error(err);
    });
  newCardModal.close();
}

function handleDeleteClick(card) {
  newConfirmationModal.open();
  newConfirmationModal._handleFormSubmit(() => {
    api
      .removeCard(card.id)
      .then(() => {
        card.handleDeleteIcon();
        newConfirmationModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .removeLike(card.id)
      .then((res) => {
        card.handleLikeIcon(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.id)
      .then((res) => {
        card._handleLikeIcon(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

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
