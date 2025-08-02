const initialCards = [
  {
    name: "Val Thorens",
    link: "./spots-images/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "./spots-images/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "./spots-images/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest...",
    link: "./spots-images/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "./spots-images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "./spots-images/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running");

  const popupProfile = document.querySelector("#edit-profile-modal");
  const popupAddCard = document.querySelector("#new-post-modal");

  const editButton = document.querySelector(".profile__edit-btn");
  const addCardButton = document.querySelector(".profile__add-btn");

  const profileEditForm = popupProfile.querySelector("form");
  const cardForm = popupAddCard.querySelector("form");

  const profileNameEl = document.querySelector(".profile__name");
  const profileDescriptionEl = document.querySelector(".profile__description");


  const previewModal = document.querySelector("#preview-image-modal");
  const previewImage = previewModal.querySelector(".modal__image");
  const previewCaption = previewModal.querySelector(".modal__caption");

 const cardsContainer = document.querySelector(".cards__list");


  function openModal(modal) {
    modal.style.visibility = "visible";
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.style.visibility = "hidden";
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
const likeIconEl = likeButtonEl.querySelector("img");

  likeButtonEl.addEventListener("click", () => {
    likeButtonEl.classList.toggle("card__like-button_active");
      if (likeButtonEl.classList.contains("card__like-button_active")) {
    likeIconEl.src = "./spots-images/Liked-button.svg";
  } else {
    likeIconEl.src = "./spots-images/Like-Icon.svg";
  }
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
    closeModal(popupAddCard);
  });

  initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
  });

previewModal.addEventListener("mousedown", (e) => {
  if (e.target === previewModal) {
    closeModal(previewModal);
  }
});
});
