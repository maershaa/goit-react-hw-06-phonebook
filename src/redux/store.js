// Импорт функций combineReducers и createStore из Redux для создания хранилища
import { combineReducers, createStore } from 'redux';

// Импорт функции devToolsEnhancer из расширения Redux DevTools
import { devToolsEnhancer } from '@redux-devtools/extension';

// Импорт редуктора контактов, который будет частью корневого редуктора
import { contactsReducer } from 'redux/reducer';

// Создание корневого редуктора с помощью функции combineReducers
const rootReducer = combineReducers({
  contactsStore: contactsReducer, // Имя ключа в объекте корневого редуктора и связанный с ним редуктор контактов
});

// Создание улучшенного (enhancer) хранилища с помощью функции devToolsEnhancer
const enhancer = devToolsEnhancer();

// Создание хранилища Redux с использованием корневого редуктора и улучшенного enhancer
export const store = createStore(rootReducer, enhancer);

// !!Чтобы отделить логику Redux от кода компонентов, нам будет достаточно создать папку src/redux с несколькими файлами:
// actions.js - файл объявления действий программы
// reducer.js - файл объявления функций-редюсеров для обновления состояния
// constants.js - файл для хранения констант (например, значений фильтра статуса)
// selectors.js - файл объявления функций-селекторов
// store.js - файл создания хранилища Redux
