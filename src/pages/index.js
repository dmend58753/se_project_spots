import "../pages/index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
import {
  enableValidation,
  resetValidation,
  settings as validationConfig,
} from "../scripts/validation.js";

import logoSvg from "../images/logo.svg";
import avatarImg from "../images/avatar.jpg";
import editProfileSvg from "../images/edit-profile.svg";
import plusSvg from "../images/plus.svg";
import closeIconSvg from "../images/close-icon.svg";


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d5ba2432-520a-4979-9ab2-6f944b51b167",
    "Content-Type": "application/json",
  },
});

let selectedCard, selectedCardId;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running");

  const logo = document.querySelector(".header__logo");
  const avatar = document.querySelector(".profile__avatar");
  const editProfileIcon = document.querySelector(".profile__edit-btn-icon");
  const plusIcon = document.querySelector(".profile__add-btn-icon");
  const closeIcons = document.querySelectorAll(".modal__close-icon");
  const deleteModal = document.querySelector("#delete-card-modal");
  const deleteForm = deleteModal.querySelector(".modal__form"); //comment



  // FIX: Add cancel button listener OUTSIDE and BEFORE deleteForm listener
  const cancelButton = deleteModal.querySelector(".modal__cancel-btn"); // comment
  cancelButton.addEventListener("click", () => { // coment
    closeModal(deleteModal);
  });

  if (logo) logo.src = logoSvg;
  if (avatar) avatar.src = avatarImg;
  if (editProfileIcon) editProfileIcon.src = editProfileSvg;
  if (plusIcon) plusIcon.src = plusSvg;
  closeIcons.forEach((icon) => (icon.src = closeIconSvg));

  const popupProfile = document.querySelector("#edit-profile-modal");
  const popupAddCard = document.querySelector("#new-post-modal");

  const avatarModal = document.querySelector("#edit-avatar-modal");
  const avatarModalButton = document.querySelector(".profile__avatar-button");
  const avatarForm = avatarModal.querySelector("form");
  const avatarInput = document.querySelector("#avatar-input");
  const avatarSubmitButton = avatarForm.querySelector(".modal__submit-btn");

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
    document.addEventListener("keydown", handleEscapeKey);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", handleEscapeKey);
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".modal_is-opened");
      if (openModal) {
        closeModal(openModal);
      }
    }
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

    const likeButtonEl = cardElement.querySelector(".card__like-button");


    // Set initial like state from server data
    if (data.isLiked) {
      likeButtonEl.classList.add("card__like-button_active");
    }

    // Single event listener for all like button clicks
    likeButtonEl.addEventListener("click", (e) => {
      handleLike(e, data._id);
    });

    // delete
    const deleteButtonEl = cardElement.querySelector(".card__delete-button");
    deleteButtonEl.addEventListener("click", () => {
      handleDeleteCard(cardElement, data);
    });

    return cardElement;
  }

  function handleDeleteCard(cardElement, data) {
    selectedCard = cardElement; 
    selectedCardId = data._id; 
    openModal(deleteModal); 
  }

  function handleLike(e, cardId) {
    const isLiked = e.target.classList.contains("card__like-button_active");

    if (isLiked) {
      api
        .unlikeCard(cardId)
        .then(() => {
          e.target.classList.remove("card__like-button_active");
        })
        .catch(console.error);
    } else {
      api
        .likeCard(cardId)
        .then(() => {
          e.target.classList.add("card__like-button_active");
        })
        .catch(console.error);
    }
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

  avatarModalButton.addEventListener("click", () => {
    avatarInput.value = "";

    const inputList = avatarModal.querySelectorAll(
      validationConfig.inputSelector
    );
    const buttonElement = avatarModal.querySelector(
      validationConfig.submitButtonSelector
    );
    resetValidation(avatarModal, inputList, buttonElement, validationConfig);

    openModal(avatarModal);
  });

  addCardButton.addEventListener("click", () => {
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");
    imageInput.value = "";
    descInput.value = "";
    
    // FIX: Add validation reset for add card form
    const inputList = popupAddCard.querySelectorAll(
      validationConfig.inputSelector
    );
    const buttonElement = popupAddCard.querySelector(
      validationConfig.submitButtonSelector
    );
    resetValidation(popupAddCard, inputList, buttonElement, validationConfig);
    
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

  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");

    // FIX: Add proper button text parameters
    setButtonText(e.submitter, true, "Save", "Saving...");

    const inputValues = {
      name: descInput.value,
      link: imageInput.value,
    };

    api
      .addCard(inputValues)
      .then((newCard) => {
        const cardElement = getCardElement(newCard);
        cardsList.prepend(cardElement);

        cardForm.reset();

        const inputList = popupAddCard.querySelectorAll(
          validationConfig.inputSelector
        );
        const buttonElement = popupAddCard.querySelector(
          validationConfig.submitButtonSelector
        );
        resetValidation(
          popupAddCard,
          inputList,
          buttonElement,
          validationConfig
        );

        closeModal(popupAddCard);
      })
      .catch(console.error)
      .finally(() => {
        // FIX: Add proper button text parameters
        setButtonText(e.submitter, false, "Save", "Saving...");
      });
  });

  avatarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Avatar updated");

    setButtonText(e.submitter, true, "Save", "Saving...");

    // Call the API to update avatar
    api
      .editAvatar(avatarInput.value)
      .then((data) => {
        // Update DOM with response data
        avatar.src = data.avatar;
        closeModal(avatarModal);
      })
      .catch(console.error)
      .finally(() => {
        // FIX: Add proper button text parameters
        setButtonText(e.submitter, false, "Save", "Saving...");
      });
  });

  api
    .getAppInfo()
    .then(([cards, userInfo]) => {
      cards.forEach(function (item) {
        const cardElement = getCardElement(item);
        cardsList.append(cardElement);
      });

      profileNameEl.textContent = userInfo.name;
      profileDescriptionEl.textContent = userInfo.about;
      avatar.src = userInfo.avatar;
    })
    .catch(console.error);

  profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Profile updated");

    const saveButton = popupProfile.querySelector(".modal__submit-btn");
    // FIX: Add proper button text parameters
    setButtonText(saveButton, true, "Save", "Saving...");

    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector(
      "#profile-description-input"
    );

    api
      .editUserInfo({
        name: nameInput.value,
        about: descriptionInput.value,
      })
      .then((data) => {
        profileNameEl.textContent = data.name;
        profileDescriptionEl.textContent = data.about;
        closeModal(popupProfile);
      })
      .catch(console.error)
      .finally(() => {
        // FIX: Add proper button text parameters
        setButtonText(saveButton, false, "Save", "Saving...");
      });
  });

  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    setButtonText(e.submitter, true, "Delete", "Deleting...");

    api
      .deleteCard(selectedCardId)
      .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
      })
      .catch(console.error)
      .finally(() => {
        setButtonText(e.submitter, false, "Delete", "Deleting...");
      });
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
