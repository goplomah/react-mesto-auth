import Header from "./Header.jsx";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound.js";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.jsx";
import authorization from "../utils/Authorization.js";
import Scroll from "./ScrollToTop.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessReg, setIsSuccessReg] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
  }, []);

  const handleConfirmDeleteClick = (card) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCardToDelete(card);
  };

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
    setIsInfoTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(handleCatchError);
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(handleCatchError);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setUserInfo({ name, job: about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleCatchError);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleCatchError);
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard({ title: name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(handleCatchError);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      authorization.checkToken(jwt).then(res => {
        if(res) {
          setIsLoggedIn(true);
          navigate("/");
          setEmail(res.data.email);
        }
      }).catch(() => {
        localStorage.removeItem('jwt');
      })
    }
  }, [isLoggedIn])

  const handleRegister = (password, email) => {
    authorization.registration(password, email).then((res) => {
      if(res) {
      setIsSuccessReg(true);
      setIsInfoTooltipOpen(true);
      navigate("/sign-in", {replace: true});
    }
    }).catch(() => {
      setIsSuccessReg(false);
      setIsInfoTooltipOpen(true);
    }) 
  }

  const handleLogin = (password, email) => {
    authorization.login(password, email).then(res => {
      localStorage.setItem('jwt', res.token);
      setIsLoggedIn(true);
      navigate("/");
    }).catch(err => {
      setIsSuccessReg(false);
      setIsInfoTooltipOpen(true);
    })
  }

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header onExit={handleExit} email={email}/>
          <Scroll />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onClose={closeAllPopups}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteClick}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin}/>} />
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
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessReg={isSuccessReg}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;