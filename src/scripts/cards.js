// Функция создания карточки
export function createCard(data) {
  const template = document.getElementById("card-template").content;
  const cardElement = template.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Установка данных
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Лайк
  likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
  });

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
      const card = deleteButton.closest(".card");
      if (card) card.remove();
  });

  // Открытие попапа с картинкой
  cardImage.addEventListener("click", () => {
      openImagePopup(data.name, data.link);
  });

  return cardElement;
}

// Функция для открытия попапа с изображением
function openImagePopup(name, link) {
  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  popup.classList.add("popup_is-opened");
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// Функция обработки клика на оверлей
function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
      closePopup(event.target);
  }
}

// Функция обработки клавиши Escape
function handleEscapeKey(event) {
  if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup.popup_is-opened");
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
}

// Добавляем обработчики событий для всех попапов
document.querySelectorAll(".popup").forEach((popup) => {
  // Закрытие по клику на оверлей
  popup.addEventListener("click", handleOverlayClick);
});

// Добавляем обработчик клавиши Escape
document.addEventListener("keydown", handleEscapeKey);


// Экспорт функции для рендера карточек
export function renderCards(container, cards) {
  cards.forEach((cardData) => {
      const card = createCard(cardData);
      container.append(card);
  });
}
