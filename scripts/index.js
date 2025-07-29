document.addEventListener("DOMContentLoaded", () => {
  const popupProfile = document.querySelector("#edit-profile-modal");
  const popupAddCard = document.querySelector("#new-post-modal");

  const editButton = document.querySelector(".profile__edit-btn");
  const addCardButton = document.querySelector(".profile__add-btn");

  const profileEditForm = popupProfile.querySelector("form");
  const cardForm = popupAddCard.querySelector("form");

  const profileNameEl = document.querySelector(".profile__name");
  const profileDescriptionEl = document.querySelector(".profile__description");

  const cardsContainer = document.querySelector(".cards__list");

  function openModal(modal) {
    modal.style.visibility = "visible";
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.style.visibility = "hidden";
    modal.classList.remove("modal_is-opened");
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
    const nameInput = popupProfile.querySelector("#profile-name-input");
    const descriptionInput = popupProfile.querySelector(
      "#profile-description-input"
    );
    profileNameEl.textContent = nameInput.value;
    profileDescriptionEl.textContent = descriptionInput.value;
    closeModal(popupProfile);
  });
});
