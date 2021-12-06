
import React from "react";

function Profile({ userName, userDescription, userAvatar, onEditAvatar, onEditProfile, onAddPlace }) {

    return (
        <>
            <div className="profile__avatar-overlay" onClick={onEditAvatar}>
                <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
            </div>
            <div className="profile__info">
                <h1 className="profile__info-name">{userName}</h1>
                <button className="profile__button profile__button_action_edit" type="button"
                    aria-label="Изменить профиль" onClick={onEditProfile}></button>
                <p className="profile__info-caption">{userDescription}</p>
            </div>
            <button className="profile__button profile__button_action_add" type="button"
                aria-label="Добавить изображение" onClick={onAddPlace}></button>
        </>
    );
}

export default Profile;