import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
    props.onCardImageClick()
  }

  return (
    <>
    {/*  <template id='addCard'> */}
      <article className="card">
        <img 
          className="card__image"
          src={
            props.card.link
            }
          alt={props.card.name}
          onClick={handleClick} 
        />
        <button 
          className="card__delete-btn"
          type="button"
        ></button>
        <div
          className="card__element"
        >
          <h2
            className="card__title"
          > {
              props.card.name
            }</h2>
          <div 
            className="card__like-container"
          >
            <button
              id="likeButton"
              className="card__like-btn"
              aria-label='Поставить лайк'
              type="button"
            ></button>
            <div 
              className="card__like-counter"
            > {
              props.card.likes.length ? props.card.likes.length : '0'
              }
            </div>
          </div>
        </div>
      </article>
    {/*  </template> */}
    </>
  );
}
export default Card