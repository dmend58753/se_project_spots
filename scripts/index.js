document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements by ID
  const popupProfile = document.querySelector("#edit-profile-modal");
  const popupAddCard = document.querySelector("#new-post-modal");

  // Get buttons by correct class names
  const editButton = document.querySelector(".profile__edit-btn");
  const addCardButton = document.querySelector(".profile__add-btn");

  // Get forms inside modals
  const profileEditForm = popupProfile.querySelector("form");
  const cardForm = popupAddCard.querySelector("form");

  // Profile display elements
  const profileNameEl = document.querySelector(".profile__name");
  const profileDescriptionEl = document.querySelector(".profile__description");

  // Cards container
  const cardsContainer = document.querySelector(".cards__list");

  // Modal open/close functions
  function openModal(modal) {
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
  }

  // Open Edit Profile modal and prefill inputs
  editButton.addEventListener("click", () => {
    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector("#profile-description-input");
    nameInput.value = profileNameEl.textContent;
    descriptionInput.value = profileDescriptionEl.textContent;
    openModal(popupProfile);
  });

  // Open New Post modal and clear inputs
  addCardButton.addEventListener("click", () => {
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");
    imageInput.value = "";
    descInput.value = "";
    openModal(popupAddCard);
  });

  // Close modals on close button click
  const closeButtons = document.querySelectorAll(".modal__close-btn");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  // Handle Edit Profile form submit
  profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector("#profile-description-input");
    profileNameEl.textContent = nameInput.value;
    profileDescriptionEl.textContent = descriptionInput.value;
    closeModal(popupProfile);
  });

  // Handle New Post form submit (adds new card)
  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageInput = popupAddCard.querySelector("#card-image-input");
    const descInput = popupAddCard.querySelector("#post-description-input");

    const card = document.createElement("li");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${imageInput.value}" alt="${descInput.value}" class="card__image" />
      <div class="card__content">
        <h2 class="card__title">${descInput.value}</h2>
        <button type="button" class="card__like-button">
          <img src="./spots-images/Like-Icon.svg" alt="like icon" />
        </button>
      </div>
    `;

    cardsContainer.prepend(card);
    cardForm.reset();
    closeModal(popupAddCard);
  });
});
