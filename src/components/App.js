import '../index.css'
import React, { useState, useEffect } from 'react'
import  api  from '../utils/api'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  })
  const [cards, setCards] = useState([])
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardImageClick() {
    setIsImagePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name, about}) {
    api.patchEditProfile({name, about})
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.patchRefreshAvatar({avatar})
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.putHandlerLike(card._id, !isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // Обновляем стейт
      setCards(newCards)
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards)
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postAddNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getInfoUser()
      .then(data => {
        setCurrentUser(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    function handleEscClose(evt) {
      return evt.key === 'Escape' ? closeAllPopups() : null
    }

    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen) {
      document.addEventListener('keydown', handleEscClose)
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        < Header />

        < Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardImageClick={handleCardImageClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        < Footer />


        {/* Popup profile */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Popup card */}
        <AddPlacePopup
          title='Новое место'
          name='add-card'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText='Создать'
        />

        {/* Popup avatar */}
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        /> 


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
    </CurrentUserContext.Provider>
  )
}

export default App
