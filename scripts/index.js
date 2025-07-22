const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// ===== PROFILE ELEMENTS =====
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// ===== EDIT PROFILE MODAL =====
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Open Edit Modal and prefill
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

// Close Edit Modal
editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// Handle Edit Form Submit
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
});

// ===== NEW POST MODAL =====
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#post-description-input"
);

// Open New Post Modal
newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

// Close New Post Modal
newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

// Handle New Post Submit
newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("New Post Image Link:", newPostImageInput.value);
  console.log("New Post Description:", newPostDescriptionInput.value);
  closeModal(newPostModal);
});

// ===== MODAL FUNCTIONS =====
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

initialCards.forEach((card) => {
  console.log("Card name:", card.name);
});

// ========== SELECTORS ==========
const profileForm = document.querySelector(".popup__form_type_edit");
const addCardForm = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_add-card");
const closeButtons = document.querySelectorAll(".popup__close-button");

// ========== FUNCTIONS ==========

// Open any popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Close any popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Close on all close buttons
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closePopup(popup);
  });
});

// ========== FORM HANDLERS ==========

// Submit Edit Profile form
profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

// Submit Add Card form (logs to console)
addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log("Card Title:", titleInput.value);
  console.log("Card Link:", linkInput.value);
  closePopup(popupAddCard);
});
