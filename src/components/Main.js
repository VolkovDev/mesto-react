import React, { useState, useEffect } from 'react';
import Card from './Card';
import api from '../utils/Api.js';
import avatarDefault from '../images/profile_avatar.jpg';

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState(avatarDefault);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => console.log(err));
  }, []);
  
  useEffect(() => {
    api.getInfoUser()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(err => console.log(err));
  }, []);

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
          {cards.map((card) => (
              <Card 
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
                onCardImageClick={props.onCardImageClick}
              />
          ))}
        </section>
      </main>
    </>
  )
}
export default Main

