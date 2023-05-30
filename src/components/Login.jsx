import { useState } from 'react';

function Login({onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(password, email);
    }


    return(
        <section className="login">
            <h2 className="form__title">Вход</h2>
            <form className="form form_type_login" onSubmit={handleSubmit}>
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
                className="form__input form__input_name_password form__input_type_dark"
                placeholder="Пароль"
                required
                value={password || ""}
                minLength="5"
                maxLength="200"
                onChange={handleChangePassword}
                />
                <span className="form__input-error form__input-error_type_dark password-input-error"></span>
                    <button type="submit" className="form__send_type_dark hover_type_dark">
                    Войти
                    </button>
            </form>
        </section>
    );
}

export default Login;   