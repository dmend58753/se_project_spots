// ==== EDIT PROFILE MODAL ==== //
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn');

editProfileBtn.addEventListener('click', () => {
  editProfileModal.classList.add('modal_is-opened');
});

editProfileCloseBtn.addEventListener('click', () => {
  editProfileModal.classList.remove('modal_is-opened');
});

// ==== NEW POST MODAL ==== //
const newPostBtn = document.querySelector('.profile__add-btn');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn');

newPostBtn.addEventListener('click', () => {
  newPostModal.classList.add('modal_is-opened');
});

newPostCloseBtn.addEventListener('click', () => {
  newPostModal.classList.remove('modal_is-opened');
});
