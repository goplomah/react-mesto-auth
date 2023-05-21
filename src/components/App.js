import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import { Routes, Route } from 'react-router-dom';
import PageNotFound from "./PageNotFound.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen]= useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  const handleCatchError = (err) => {
    console.log(`Упс...Ошибка получения данных с сервера: ${err}`);
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitCard()])
    .then(([me, cards]) => {
      setCurrentUser(me);
      setCards(cards);
    })
    .catch(handleCatchError);
  }, [])

  const handleConfirmDeleteClick = (card) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCardToDelete(card);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(handleCatchError);
  }

  const handleCardDelete = (card) => {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    }).catch(handleCatchError);
  }

  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo({name, job: about}).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(handleCatchError);
  }

  const handleUpdateAvatar = ({avatar}) => {
    api.updateAvatar({avatar}).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(handleCatchError);
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    api.addCard({title: name, link}).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    }).catch(handleCatchError);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onClose={closeAllPopups}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
              cards={cards}
            />
          } />
          {/* <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
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
        name="image" 
        onClose={closeAllPopups} 
        card={selectedCard}
        />
        <ConfirmPopup
        onClose={closeAllPopups}
        isOpen={isConfirmPopupOpen}
        onConfirmDelete={handleCardDelete}
        cardToDelete={cardToDelete}
        />
        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
         />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
