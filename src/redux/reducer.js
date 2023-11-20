// ! ПРИМЕР Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Создание среза контактов с помощью функции createSlice из Redux Toolkit
const contactsSlice = createSlice({
  name: 'contacts', // Уникальное имя для среза, используется для генерации действий и редуктора
  initialState: { contacts: [], filter: '' }, // Начальное состояние среза
  reducers: {
    // Действия (actions) для обновления состояния среза
    addContact(state, action) {
      // Добавление нового контакта в массив контактов
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      // Удаление контакта из массива контактов по его ID
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, action) {
      // Обновление фильтра для поиска контактов
      state.filter = action.payload;
    },
  },
});

// Экспорт созданных действий (actions) для использования в других частях приложения
export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;

// Экспорт редуктора, который автоматически создан функцией createSlice
export const contactsReducer = contactsSlice.reducer;

// ================================================================================= //
// !ВАНИАЛЬНЫЙ REDUX не используем но в качестве примера оставляю
// // Начальное состояние для контактов
// const initialState = {
//   filter: '', // Начальный фильтр для поиска контактов, изначально пустая строка
//   contacts: JSON.parse(localStorage.getItem('contacts')) || [], // Массив контактов, сохраненный в локальном хранилище браузера
// };

// // Редуктор для управления состоянием контактов
// export const contactsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Удаление контакта по его ID
//     case 'contacts/deleteContact': {
//       // Обновляем список контактов, фильтруя контакт с указанным ID
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           contact => contact.id !== action.payload
//         ),
//       };
//     }
//     // Добавление нового контакта
//     case 'contacts/addContact': {
//       // Добавляем новый контакт в список контактов
//       return {
//         ...state,
//         contacts: [...state.contacts, action.payload],
//       };
//     }
//     // Обновление фильтра для поиска контактов
//     case 'filter/filterContact': {
//       // Обновляем значение фильтра для поиска контактов на основе переданного значения в действии
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     }
//     default:
//       // В остальных случаях возвращаем текущее состояние
//       return state;
//   }
// };
