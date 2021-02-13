import React, { useState, useEffect } from 'react'
import Card from './Card'
import api from '../utils/Api.js'
import {CurrentUserContext} from "../contexts/CurrentUserContext"
// import avatarDefault from '../images/profile_avatar.jpg'

function Main(props) {
  const currentUser  = React.useContext(CurrentUserContext)
  const userName = currentUser.name
  const userDescription = currentUser.about
  const userAvatar = currentUser.avatar
  // const [userName, setUserName] = useState()
  // const [userDescription, setUserDescription] = useState()
  // const [userAvatar, setUserAvatar] = useState(avatarDefault)
  // const [cards, setCards] = useState([])

  // useEffect(() => {
  //   api.getInitialCards()
  //     .then(initialCards => {
  //       setCards(initialCards)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some(i => i._id === currentUser._id)
    
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.putHandlerLike(card._id, !isLiked).then((newCard) => {
  //       // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
  //     const newCards = cards.map((c) => c._id === card._id ? newCard : c)
  //     // Обновляем стейт
  //     setCards(newCards)
  //   })
  // }

  // function handleCardDelete(card) {
  //   api.deleteCard(card._id).then(() => {
  //     const newCards = cards.filter((c) => c._id !== card._id)
  //     setCards(newCards)
  //   })
  // }
  
  // useEffect(() => {
  //   api.getInfoUser()
  //     .then(data => {
  //       setUserName(data.name)
  //       setUserDescription(data.about)
  //       setUserAvatar(data.avatar)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <>
      <main className='content'>
        <section className='profile'>
          <div
            className='profile__avatar-container'
            onClick={props.onEditAvatar}>
            <img
              src={userAvatar} 
              alt={userName}
              className='profile__avatar'
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              className='profile__edit-button' 
              type='button'
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className='profile__hobby'>{userDescription}</p>
          <button
            className='profile__add-button'
            type='button'
            onClick={props.onAddPlace}></button>
        </section>

        <section className='cards'>
          {props.cards.map((card) => (
              <Card 
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardImageClick={props.onCardImageClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
          ))}
        </section>
      </main>
    </>
  )
}
export default Main