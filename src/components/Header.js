import logo from "../images/header__logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="https://goplomah.github.io/mesto/" className="header__link">
        <img src={logo} alt="логотип сайта место." className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
