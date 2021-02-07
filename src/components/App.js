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
  const [selectedCard, setSelectedCard] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

    // function handleEditAvatarClick() {
  //   const popUpAvatar = document.querySelector('.pop-up_type_avatar')
  //   popUpAvatar.classList.add('pop-up_opened')
  // }
  // function handleEditProfileClick() {
  //   const popUpAvatar = document.querySelector('.pop-up_type_profile')
  //   popUpAvatar.classList.add('pop-up_opened')
  // }
  // function handleAddPlaceClick() {
  //   const popUpAvatar = document.querySelector('.pop-up_type_add-card')
  //   popUpAvatar.classList.add('pop-up_opened')
  // }

  useEffect(() => {
    function handleEscClose(evt) {
      return evt.key === 'Escape'? closeAllPopups() : null
    }

    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
    } 

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);

  return (
    <>
      <div className='page'>

        < Header />

        < Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        < Footer />
      

        {/* Popup profile */}
        <PopupWithForm
          title='Редактировать профиль'
          name='profile'
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
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
          <button 
            className='pop-up__form-btn-submit' 
            type='submit'
          >Сохранить</button>
        </PopupWithForm>

        {/* Popup card */}
        <PopupWithForm
          title='Новое место'
          name='add-card'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          <button 
            className='pop-up__form-btn-submit' 
            type='submit'
          >Создать
          </button>
        </PopupWithForm>

         {/* Popup avatar */}
        <PopupWithForm
          title='Обновить аватар'
          name='avatar'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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
          <button 
            type='submit' 
            className='pop-up__form-btn-submit' 
          >Сохранить</button>
        </PopupWithForm>

        {/* Popup confirm */}
        < PopupWithForm
          title='Вы уверены?'
          name='confirm'
          onClose={closeAllPopups}
        >
          <button 
            className='pop-up__form-btn-submit pop-up__form-btn-submit_comfirm' 
            type='button'
          >Да
          </button>
        </PopupWithForm>

        {/* Popup image */}
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        ></ImagePopup>

      </div>
    </>
  );
}

export default App;
