import { Link, Routes, Route } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header({email, onExit}) {
  return (
    <header className="header">
      <a href="https://goplomah.github.io/react-mesto-auth/" className="header__link">
        <img src={logo} alt="логотип сайта место." className="header__logo" />
      </a>
      <nav className="header__nav">
        <p className="header__email">{email}</p>
        <Routes>
          <Route path='/sign-in' element={<Link className="header__link" to='/sign-up'>Регистрация</Link>}/>
          <Route path='/sign-up' element={<Link className="header__link" to='/sign-in'>Вход</Link>}/>
          <Route path='/' element={<Link className="header__link" to='/sign-in' onClick={onExit}>Выход</Link>}/>
          <Route path='*' element={<Link className="header__link" to='/'>На главную</Link>}/>
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
