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

  async function getCards() {
    let initialCards;

    try {
      initialCards = await api.getInitialCards();
    } catch (error) {
      return console.log(error);
    }

    setCards(initialCards);
  }

  async function checkUserValidity() {
    let userData;

    try {
      userData = await auth.checkToken();
    } catch (error) {
      return console.log(error);
    }

    setLoggedIn(true);
    setEmail(userData.email);
    setCurrentUser(userData);
    getCards();
    history.push('/');
  }

  useEffect(() => {
    checkUserValidity();
  }, []);

  async function handleRegister(userData) {
    try {
      await auth.register(userData);
      setStatus(true);
    } catch (error) {
      console.log(error);
      setStatus(false);
    } finally {
      setIsInfoToolTipOpen(true)
    }
  };

  async function handleLogin(userData) {
    try {
      await auth.login(userData);
    } catch (error) {
      setStatus(false);
      setIsInfoToolTipOpen(true);
      return console.log(error);
    }

    checkUserValidity();
  };

  async function handleLogout() {
    try {
      auth.logout()
    } catch (error) {
      return console.log(error);
    }

    setLoggedIn(false);
    setCurrentUser(null);
  }

  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  async function handleUpdateAvatar({ avatar }) {
    let updatedUserInfo;

    try {
      updatedUserInfo = await api.updateAvatar(avatar);
    } catch (error) {
      return console.log(error);
    }

    setCurrentUser(updatedUserInfo);
    closeAllPopups();
  }

  async function handleUpdateUser(newUserInfo) {
    let updatedUserInfo;

    try {
      updatedUserInfo = await api.updateUserInfo(newUserInfo);
    } catch (error) {
      return console.log(error);
    }

    setCurrentUser(updatedUserInfo);
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    let updatedCard;

    try {
      updatedCard = await api.changeLikeCardStatus(card._id, isLiked);
    } catch (error) {
      return console.log(error);
    }

    setCards((prevCards) => {
      return prevCards.map((prevCard) => prevCard._id === card._id ? updatedCard : prevCard);
    });
  }

  function handleCardTrashClick(card) {
    setCardToDelete(card)
  }

  async function handleAddPlaceSubmit(cardInfo) {
    let newCard;

    try {
      newCard = await api.addCard(cardInfo);
    } catch (error) {
      return console.log(error);
    }

    setCards([newCard, ...cards]);
    closeAllPopups();
  }

  async function handleDeleteCard(card) {
    try {
      await api.removeCard(card._id)
    } catch (error) {
      return console.log(error);
    }

    setCards((prevCards) => {
      closeAllPopups();
      return prevCards.filter((prevCard) => prevCard._id !== card._id);
    });
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser || {}}>
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