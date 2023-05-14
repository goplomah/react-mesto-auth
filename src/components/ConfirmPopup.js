import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({isOpen, onClose, onConfirmDelete, cardToDelete}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirmDelete(cardToDelete);
    }

    return(
        <PopupWithForm
          name="delete"
          onClose={onClose}
          title="Вы уверены?"
          submitButtonText="Да"
          isOpen={isOpen}
          onSubmit={handleSubmit}
        />
    );
}

export default ConfirmPopup;