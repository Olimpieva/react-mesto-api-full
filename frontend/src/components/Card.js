
import React, { memo, useContext } from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {

    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = useContext(CurrentUserContext);

    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    function handleCardClick() {
        onCardClick(card);
    }

    function handlerCardLike() {
        onCardLike(card);
    }

    function handlerCardDelete() {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <img className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick} />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-info">
                    <button className={`card__like ${isLiked && 'card__like_active'}`}
                        type="button"
                        aria-label="Поставить лайк"
                        onClick={handlerCardLike}></button>
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
            {card.owner._id === currentUser._id && (
                <button className="card__remove"
                    type="button"
                    aria-label="Удалить изображение"
                    onClick={handlerCardDelete}></button>
            )}
        </li>
    );
}

export default memo(Card);