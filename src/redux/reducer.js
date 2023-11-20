// Начальное состояние для контактов
const initialState = {
  filter: '', // Начальный фильтр для поиска контактов, изначально пустая строка
  contacts: JSON.parse(localStorage.getItem('contacts')) || [], // Массив контактов, сохраненный в локальном хранилище браузера
};

// Редуктор для управления состоянием контактов
export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Удаление контакта по его ID
    case 'contacts/deleteContact': {
      // Обновляем список контактов, фильтруя контакт с указанным ID
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };
    }
    // Добавление нового контакта
    case 'contacts/addContact': {
      // Добавляем новый контакт в список контактов
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    // Обновление фильтра для поиска контактов
    case 'filter/filterContact': {
      // Обновляем значение фильтра для поиска контактов на основе переданного значения в действии
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      // В остальных случаях возвращаем текущее состояние
      return state;
  }
};
