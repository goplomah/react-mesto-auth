import { useState } from "react";
import { Link } from 'react-router-dom';

function Register() {
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
    // onRegister(email, password);
  };

  return (
    <section className="register">
      <h2 className="form__title">Регистрация</h2>
      <form className="form form_type_register" onChange={handleSubmit}></form>
      <input
        id="email-register-input"
        type="email"
        name="email-register"
        className="form__input form__input_name_email-register form__input_type_dark"
        placeholder="E-mail"
        required
        value={email || ""}
        onChange={handleChangeEmail}
      />
      <span className="form__input-error form__input-error_type_dark email-register-input-error"></span>
      <input
        id="password-register-input"
        type="password"
        name="password-register"    
        className="form__input form__input_name_password-register form__input_type_dark"
        placeholder="Пароль"
        required
        value={password || ""}
        minLength="5"
        maxLength="200"
        onChange={handleChangePassword}
      />
      <span className="form__input-error form__input-error_type_dark password-register-input-error"></span>
      <button type="submit" className="form__send_type_dark  ">
        Зарегистрироваться
      </button>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link className="register__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
