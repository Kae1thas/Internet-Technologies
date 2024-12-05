import '../pages/index.css';
import { renderCards, createCard } from './cards.js';

// Импортируем изображения через Webpack
import card1 from '../images/card_1.jpg';
import card2 from '../images/card_2.jpg';
import card3 from '../images/card_3.jpg';

// Массив начальных карточек
const initialCards = [
    { name: "Архыз", link: card1 },  // Используем импортированные изображения
    { name: "Челябинская область", link: card2 },
    { name: "Иваново", link: card3 },
    { name: "Камчатка", link: card3 },
    { name: "Холмогорский район", link: card3 },
    { name: "Байкал", link: card3 }
];

// Рендер начальных карточек
document.addEventListener("DOMContentLoaded", () => {
    const placesList = document.querySelector(".places__list");
    renderCards(placesList, initialCards);
});

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const popup = closeButton.closest(".popup");
        popup.classList.remove("popup_is-opened");
    });
});

// Открытие/закрытие попапа редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editProfileButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    editPopup.classList.add("popup_is-opened");
});

document.querySelector(".popup__form[name='edit-profile']").addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    editPopup.classList.remove("popup_is-opened");
});

// Открытие/закрытие попапа добавления карточки
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

addCardButton.addEventListener("click", () => {
    newCardPopup.classList.add("popup_is-opened");
});

document.querySelector(".popup__form[name='new-place']").addEventListener("submit", (event) => {
    event.preventDefault();

    const newCard = createCard({
        name: cardNameInput.value,
        link: cardLinkInput.value
    });

    placesList.prepend(newCard); // Добавляем новую карточку в начало списка
    cardNameInput.value = "";
    cardLinkInput.value = "";
    newCardPopup.classList.remove("popup_is-opened");
});
