import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          isOpen={isOpen}
          submitButtonText="Сохранить"
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            id="name-input"
            type="text"
            name="name"
            className="form__input form__input_name_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ""}
            onChange={handleChangeName}
          />
          <span className="form__input-error name-input-error"></span>
          <input
            id="job-input"
            type="text"
            name="job"
            className="form__input form__input_name_job"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={description || ""}
            onChange={handleChangeDescription}
          />
          <span className="form__input-error job-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;