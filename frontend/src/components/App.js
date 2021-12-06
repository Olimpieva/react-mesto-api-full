// import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory, useLocation } from 'react-router-dom';

import api from '../utils/Api';
import auth from '../utils/ApiAuth';
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import InfoToolTip from './InfoTooltip';
import { CurrentUserContext } from '../context/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  function checkTokenValidity(token) {
    auth.checkToken(token)
      .then((tokenData) => {
        setLoggedIn(true);
        setEmail(tokenData.data.email)
        history.push('/');
      })
      .catch(error => {
        console.log(`Произошла ошибка: ${error}`);
        setStatus(false);
        setIsInfoToolTipOpen(true);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkTokenValidity(jwt);
    }
  }, []);

  function handleRegister(userData) {
    auth.register(userData)
      .then((userData) => {
        setStatus(true);
      })
      .catch(error => {
        console.log(`Произошла ошибка: ${error}`);
        setStatus(false);
      })
      .finally(() => setIsInfoToolTipOpen(true))
  };

  function handleLogin(userData) {
    auth.login(userData)
      .then((userData) => {
        localStorage.setItem('jwt', userData.token);
        checkTokenValidity(userData.token);
      })
      .catch(error => {
        console.log(`Произошла ошибка: ${error}`);
        setStatus(false);
        setIsInfoToolTipOpen(true);
      });
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }, [])

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }

  function handleUpdateUser(newUserInfo) {
    api.updateUserInfo(newUserInfo)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((prevCards) => {
          return prevCards.map((prevCard) => prevCard._id === card._id ? updatedCard : prevCard);
        });
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }
  function handleCardTrashClick(card) {
    setCardToDelete(card)
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }

  function handleDeleteCard(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((prevCards) => {
          closeAllPopups();
          return prevCards.filter((prevCard) => prevCard._id !== card._id);
        });
      })
      .catch(error => console.log(`Произошла ошибка: ${error}`));
  }

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          location={location.pathname}
          email={email}
          onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardTrashClick}
          />
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>
        </Switch>

        <Footer />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={status}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard || {}}
          onClose={closeAllPopups}
        />

        <ConfirmationPopup
          data={cardToDelete}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);