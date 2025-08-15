export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
};

console.log("Validation script loaded");

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  console.log(formList);

  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  console.log(inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
  toggleButtonState(inputList, buttonElement, config);
};

const checkInputValidity = (formEl, inputEl, config) => {
  console.log(inputEl.validity);
  console.log(inputEl.validationMessage);

  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageId = inputEl.id + "-error";
  console.log(errorMessageId);

  inputEl.classList.add(config.inputErrorClass);
  document.querySelector(`#${errorMessageId}`).textContent = errorMessage;
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageId = inputEl.id + "-error";

  inputEl.classList.remove(config.inputErrorClass);
  document.querySelector(`#${errorMessageId}`).textContent = "";
};

export const toggleButtonState = (inputList, buttonEl, config) => {
  console.log(hasInvalidInput(inputList));

  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

export const resetValidation = (formEl, inputList, buttonElement, config) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  if (buttonElement) {
    disableButton(buttonElement, config);
  }
};
