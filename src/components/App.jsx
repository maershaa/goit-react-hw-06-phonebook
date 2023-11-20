// Импорт библиотек и компонентов React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Импорт хуков React Redux для работы с состоянием Redux

// Импорт компонентов приложения
import ContactForm from './ContactForm/ContactForm'; // Компонент формы для добавления контактов
import ContactList from './Contacts/ContactsList'; // Компонент списка контактов
import Filter from './Filter/Filter'; // Компонент фильтра для поиска контактов
import css from './App.module.css'; // Стили приложения

// Основной компонент приложения
const App = () => {
  const dispatch = useDispatch(); // Получение функции dispatch для отправки действий в Redux Store
  const contacts = useSelector(state => state.contactsStore.contacts); // Получение контактов из хранилища Redux
  console.log('contacts', contacts);
  const filter = useSelector(state => state.contactsStore.filter); // Получение фильтра из хранилища Redux

  // Функция для добавления нового контакта
  const handleAddContact = newContact => {
    // Проверка на наличие дубликата контакта
    const normalizeName = newContact.name.toLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    if (isDuplicate) {
      alert(`${newContact.name} уже есть в контактах`);
      return;
    }

    // Создание действия для добавления контакта и отправка его в Redux Store
    const addContactAction = {
      type: 'contacts/addContact',
      payload: newContact,
    };
    dispatch(addContactAction);
  };

  // Функция для удаления контакта по его ID
  const handleDeleteContact = contactId => {
    // Создание действия для удаления контакта и отправка его в Redux Store
    const deleteContactAction = {
      type: 'contacts/deleteContact',
      payload: contactId,
    };
    dispatch(deleteContactAction);
  };

  // Функция для обновления фильтра поиска контактов
  const handleFilterChange = newFilterValue => {
    // Создание действия для обновления фильтра и отправка его в Redux Store
    const filterAction = {
      type: 'filter/filterContact',
      payload: newFilterValue,
    };
    dispatch(filterAction);
  };

  // Функция для фильтрации контактов в соответствии с текущим фильтром
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // Рендеринг компонентов и передача необходимых данных и обработчиков событий
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />{' '}
      {/* Рендеринг формы для добавления контакта и передача метода addContact как обработчика */}
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()} // Передача отфильтрованного массива контактов
        onDeleteContact={contactId => handleDeleteContact(contactId)} // Передача функции для удаления контакта с аргументом
      />
    </div>
  );
};

export default App; // Экспорт основного компонента приложения
