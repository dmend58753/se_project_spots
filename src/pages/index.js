import "../pages/index.css";
import {
  enableValidation,
  resetValidation,
  toggleButtonState,
  settings as validationConfig,
} from "../scripts/validation.js";

import image1 from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import image2 from "../images/2-photo-by-ceiline-from-pexels.jpg";
import image3 from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import image4 from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import image5 from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import image6 from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";

import logoSvg from "../images/logo.svg";
import avatarImg from "../images/avatar.jpg";
import editProfileSvg from "../images/edit-profile.svg";
import plusSvg from "../images/plus.svg";
import closeIconSvg from "../images/close-icon.svg";

const initialCards = [
  {
    name: "Val Thorens",
    link: image1,
  },
  {
    name: "Restaurant terrace",
    link: image2,
  },
  {
    name: "An outdoor cafe",
    link: image3,
  },
  {
    name: "A very long bridge, over the forest...",
    link: image4,
  },
  {
    name: "Tunnel with morning light",
    link: image5,
  },
  {
    name: "Mountain house",
    link: image6,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running");

  const logo = document.querySelector(".header__logo");
  const avatar = document.querySelector(".profile__avatar");
  const editProfileIcon = document.querySelector(".profile__edit-btn-icon");
  const plusIcon = document.querySelector(".profile__add-btn-icon");
  const closeIcons = document.querySelectorAll(".modal__close-icon");

  if (logo) logo.src = logoSvg;
  if (avatar) avatar.src = avatarImg;
  if (editProfileIcon) editProfileIcon.src = editProfileSvg;
  if (plusIcon) plusIcon.src = plusSvg;
  closeIcons.forEach((icon) => (icon.src = closeIconSvg));

  const popupProfile = document.querySelector("#edit-profile-modal");
  const popupAddCard = document.querySelector("#new-post-modal");

  const editButton = document.querySelector(".profile__edit-btn");
  const addCardButton = document.querySelector(".profile__add-btn");

  const profileEditForm = popupProfile.querySelector("form");
  const cardForm = popupAddCard.querySelector("form");

  const profileSubmitButton =
    profileEditForm.querySelector(".modal__submit-btn");
  const cardSubmitButton = cardForm.querySelector(".modal__submit-btn");

  const profileNameEl = document.querySelector(".profile__name");
  const profileDescriptionEl = document.querySelector(".profile__description");

  const previewModal = document.querySelector("#preview-image-modal");
  const previewImage = previewModal.querySelector(".modal__image");
  const previewCaption = previewModal.querySelector(".modal__caption");

  const cardsContainer = document.querySelector(".cards__list");

  function openModal(modal) {
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
  }

  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardsList = document.querySelector(".cards__list");

  function getCardElement(data) {
    console.log("card, data.name");
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;

    cardImageEl.addEventListener("click", () => {
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(previewModal);
    });

    //like button logic
    const likeButtonEl = cardElement.querySelector(".card__like-button");

    likeButtonEl.addEventListener("click", () => {
      likeButtonEl.classList.toggle("card__like-button_active");
    });

    // delete button logic
    const deleteButtonEl = cardElement.querySelector(".card__delete-button");
    deleteButtonEl.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  editButton.addEventListener("click", () => {
    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector(
      "#profile-description-input"
    );

    const inputList = popupProfile.querySelectorAll(
      validationConfig.inputSelector
    );
    const buttonElement = popupProfile.querySelector(
      validationConfig.submitButtonSelector
    );
    resetValidation(popupProfile, inputList, buttonElement, validationConfig);

    nameInput.value = profileNameEl.textContent;
    descriptionInput.value = profileDescriptionEl.textContent;
    openModal(popupProfile);
  });

  addCardButton.addEventListener("click", () => {
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");
    imageInput.value = "";
    descInput.value = "";
    openModal(popupAddCard);
  });

  const closeButtons = document.querySelectorAll(".modal__close-btn");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Profile updated");
    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector(
      "#profile-description-input"
    );
    profileNameEl.textContent = nameInput.value;
    profileDescriptionEl.textContent = descriptionInput.value;
    closeModal(popupProfile);
  });

  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");

    const inputValues = {
      name: descInput.value,
      link: imageInput.value,
    };

    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);

    cardForm.reset();

    const inputList = popupAddCard.querySelectorAll(
      validationConfig.inputSelector
    );
    const buttonElement = popupAddCard.querySelector(
      validationConfig.submitButtonSelector
    );
    resetValidation(popupAddCard, inputList, buttonElement, validationConfig);

    closeModal(popupAddCard);
  });

  initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
  });

  previewModal.addEventListener("mousedown", (e) => {
    if (
      e.target === previewModal ||
      e.target.classList.contains("modal__close-btn")
    ) {
      closeModal(previewModal);
    }
  });
  enableValidation(validationConfig);
});
