import "../pages/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
import {
  config,
  profileEditButton,
  profileForm,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  addCardButton,
  cardForm,
  editAvatarButton,
} from "../utils/constants.js";

// User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "24d24150-f342-4b21-ba37-43c96c87f158",
    "Content-Type": "application/json",
  },
});

// Create Card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card__template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getCard();
}

// User Info and Initial Cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    const cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const card = createCard(cardData);
          cardSection.addItem(card);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch(console.error);

// Submit Handler
function handleSubmit(request, modal, loadingText) {
  modal.renderLoading(true, loadingText);
  request()
    .then(() => {
      modal.close();
    })
    .catch(console.error)
    .finally(() => {
      modal.renderLoading(false);
    });
}

// Image Modal
const modalWithImage = new ModalWithImage({
  modalSelector: "#preview__image-modal",
});

modalWithImage.setEventListeners();

function handleImageClick(cardData) {
  modalWithImage.open(cardData);
}

// Edit Profile Modal
const editModal = new ModalWithForm(
  {
    modalSelector: "#profile__edit-modal",
  },
  handleProfileFormSubmit
);

editModal.setEventListeners();

function handleProfileFormSubmit(data) {
  function makeRequest() {
    return api.setUserInfo(data).then((res) => {
      userInfo.setUserInfo(res);
    });
  }
  handleSubmit(makeRequest, editModal);
}

// function handleProfileFormSubmit(data) {
//   editModal.renderLoading(true);
//   api
//     .setUserInfo(data)
//     .then((res) => {
//       userInfo.setUserInfo(res);
//       editModal.close();
//     })
//     .catch(console.error)
//     .finally(() => {
//       editModal.renderLoading(false);
//     });
// }

// Add Card Modal
const newCardModal = new ModalWithForm(
  {
    modalSelector: "#card__add-modal",
  },
  handleCardFormSubmit
);

newCardModal.setEventListeners();

function handleCardFormSubmit(data) {
  newCardModal.renderLoading(true);
  api
    .addCard(data)
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card);
      newCardModal.close();
    })
    .catch(console.error)
    .finally(() => {
      newCardModal.renderLoading(false);
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
        card.handleLikeIcon(res.isLiked);
      })
      .catch(console.error);
  }
}

// Delete Card Modal
const newConfirmationModal = new ModalWithConfirmation(
  {
    modalSelector: "#delete__card-modal",
  },
  handleDeleteClick
);

newConfirmationModal.setEventListeners();

function handleDeleteClick(card) {
  newConfirmationModal.open();
  newConfirmationModal.setSubmitAction(() => {
    api
      .removeCard(card.id)
      .then(() => {
        card.handleDeleteIcon();
        newConfirmationModal.close();
      })
      .catch(console.error);
  });
}

// Edit Avatar Modal
const editAvatarModal = new ModalWithForm(
  {
    modalSelector: "#avatar__edit-modal",
  },
  handleAvatarFormSubmit
);

editAvatarModal.setEventListeners();

function handleAvatarFormSubmit(data) {
  editAvatarModal.renderLoading(true);
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarModal.close();
    })
    .catch(console.error)
    .finally(() => {
      editAvatarModal.renderLoading(false);
    });
}

function fillProfileForm() {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.description;
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

editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
  formValidators[editAvatarModal._form.getAttribute("name")].resetValidation();
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
