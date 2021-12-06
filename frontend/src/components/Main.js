
import React, { useContext } from 'react';
import Profile from './Profile';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">

            <section className="profile content__profile">
                <Profile
                    userName={currentUser.name}
                    userDescription={currentUser.about}
                    userAvatar={currentUser.avatar}
                    onEditAvatar={onEditAvatar}
                    onEditProfile={onEditProfile}
                    onAddPlace={onAddPlace} />
            </section>

            <section className="gallery content__gallery">
                <ul className="cards">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>

        </main>
    )
}

export default Main;