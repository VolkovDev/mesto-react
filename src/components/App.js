import '../index.css';
import React, { useState, useEffect} from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardImageClick() {
    setIsImagePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      return evt.key === 'Escape'? closeAllPopups() : null
    }

    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen) {
      document.addEventListener('keydown', handleEscClose);
    } 

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen]);

  return (
    <>
      <div className='page'>

        < Header />

        < Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardImageClick={handleCardImageClick}
        />

        < Footer />
      

        {/* Popup profile */}
        <PopupWithForm
          title='Редактировать профиль'
          name='profile'
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          buttonText='Сохранить'
        >
          <input 
            name='input-name'
            type='text'
            id='name-input' 
            className='pop-up__form-input pop-up__form-input_type_name' 
            placeholder='Имя Фамилия' 
            required 
            minLength='2'
            maxLength='40' 
            autoComplete='off' 
          />
          <span 
            className='pop-up__form-input-error' 
            id='name-input-error'
          ></span>

          <input 
            name='input-hobby' 
            type='text' 
            id='hobby-input' 
            className='pop-up__form-input pop-up__form-input_type_hobby' 
            placeholder='Хобби' 
            required 
            minLength='2'
            maxLength='200' 
            autoComplete='off' 
          />
          <span 
            className='pop-up__form-input-error' 
            id='hobby-input-error'
          ></span>

        </PopupWithForm>

        {/* Popup card */}
        <PopupWithForm
          title='Новое место'
          name='add-card'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText='Создать'
        >
          <input 
            name='input-name-image' 
            type='text' 
            id='name-image-input' 
            className='pop-up__form-input pop-up__form-input_type_image' 
            placeholder='Название' 
            required 
            minLength='2'
            maxLength='30' 
            autoComplete='off' 
          />
          <span 
            className='pop-up__form-input-error' 
            id='name-image-input-error'
          ></span>
          <input 
            name='input-url' 
            type='url' 
            id='url-input' 
            className='pop-up__form-input pop-up__form-input_type_url' 
            placeholder='Ссылка на картинку' 
            required
            autoComplete='off' 
          />
          <span 
            className='pop-up__form-input-error' 
            id='url-input-error'
          ></span>

        </PopupWithForm>

         {/* Popup avatar */}
        <PopupWithForm
          title='Обновить аватар'
          name='avatar'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText='Сохранить'
        >
          <input 
            name='input-avatar' 
            id='avatar-input' 
            type='url' 
            className='pop-up__form-input pop-up__form-input_type_link-avatar' 
            placeholder='Ссылка на картинку' 
            required 
          />
          <span 
            className='pop-up__form-input-error' 
            id='avatar-input-error'
          ></span>

        </PopupWithForm>

        {/* Popup confirm */}
        < PopupWithForm
          title='Вы уверены?'
          name='confirm'
          onClose={closeAllPopups}
          buttonText='Да'
        >

        </PopupWithForm>

        {/* Popup image */}
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        ></ImagePopup>

      </div>
    </>
  );
}

export default App;
