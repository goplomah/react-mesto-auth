import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function Register({ onRegister, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(password, email);
  };

  return (
    <section className="register">
      <h2 className="form__title">Регистрация</h2>
      <form className="form form_type_register" onSubmit={handleSubmit}>
        <input
          id="email-input"
          type="email"
          name="email"
          className="form__input form__input_name_email form__input_type_dark"
          placeholder="E-mail"
          required
          value={email || ""}
          onChange={handleChangeEmail}
        />
        <span className="form__input-error form__input-error_type_dark email-input-error"></span>
        <input
          id="password-input"
          type="password"
          name="password"
          className="form__input form__input_name_password-register form__input_type_dark"
          placeholder="Пароль"
          required
          value={password || ""}
          minLength="5"
          maxLength="200"
          onChange={handleChangePassword}
        />
        <span className="form__input-error form__input-error_type_dark password-input-error"></span>
        <button type="submit" className={`form__send form__send_type_dark hover_type_dark ${isLoading && 'form__send_disabled'}`}>
        {isLoading ? <Spinner /> : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link
          className="register__link register__link_type_hover"
          to="/sign-in"
        >
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;