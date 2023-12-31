import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types'; // npm install --save prop-types
import { addContact } from 'redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

const ContactForm = () => {
  // Используем useState для управления состоянием полей name и number
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // Получение контактов и фильтра из хранилища Redux
  const contacts = useSelector(state => state.contactsStore.contacts);

  // Получение функции dispatch для отправки действий в Redux Store
  const dispatch = useDispatch();

  // Создаем уникальный идентификатор для элемента input
  const loginInputId = nanoid();

  // Обработчик отправки формы
  const handleSubmit = evt => {
    evt.preventDefault();

    // Создаем объект контакта с уникальным идентификатором
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizeName = newContact.name.toLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );
    if (isDuplicate) {
      alert(`${newContact.name} уже есть в контактах`);
      return;
    }

    // Отправка действия для добавления контакта с помощью Redux Toolkit
    dispatch(addContact(newContact));

    // Сбрасываем значения полей после добавления контакта
    reset();
  };

  // Обработчик изменения значений полей input
  const handleChange = evt => {
    const { name, value } = evt.target;

    // Проверяем имя поля и обновляем соответствующее состояние
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  // Функция для сброса значений полей в исходное состояние
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={loginInputId} className={css.formLabel}>
        <input
          type="text"
          name="name"
          pattern={
            "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          }
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          id={loginInputId}
          className={css.inputText}
          placeholder="Name"
        />
      </label>

      <label htmlFor={loginInputId} className={css.formLabel}>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
          required
          value={number}
          onChange={handleChange}
          id={loginInputId}
          className={css.inputText}
          placeholder="Number"
        />
      </label>

      <button type="submit" className={css.addButton}>
        Save
      </button>
    </form>
  );
};

// Указываем propTypes для name и number, чтобы определить их тип
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
