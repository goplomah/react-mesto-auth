import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [title, setTitle]=useState('');
    const [link, setLink]=useState('');

    useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: title,
            link
        })
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    }

    return(
        <PopupWithForm
          title="Новое место"
          name="add"
          isOpen={isOpen}
          submitButtonText="Создать"
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            id="add-title-input"
            type="text"
            name="title"
            className="form__input form__input_name_title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            value={title}
            onChange={handleChangeTitle}
          />
          <span className="form__input-error add-title-input-error"></span>
          <input
            id="add-url-input"
            type="url"
            name="link"
            className="form__input form__input_name_link"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleChangeLink}
          />
          <span className="form__input-error add-url-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;