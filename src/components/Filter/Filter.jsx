import React from 'react';
// import css from '../Contacts/Contacts.module.css';
import css from 'components/Filter/Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/reducer';

// Компонент Filter принимает два свойства: value и onChange
const Filter = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из Redux
  const filter = useSelector(state => state.contactsStore.filter);

  const handleFilterChange = e => {
    const newFilterValue = e.target.value;
    // Диспетчер экшена для обновления фильтрации контактов
    dispatch(filterContact(newFilterValue));
  };

  <input
    type="text"
    name="nameFilter"
    value={filter} // Значение поля ввода, переданное через свойство value
    pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"} // Регулярное выражение, задающее паттерн для ввода (по имени)
    onChange={handleFilterChange}
    placeholder="Search by name" // Плейсхолдер, отображается в поле ввода
    className={css.inputText} // Применение стилей из CSS-модуля
  />;
};

// В данном случае, обработчик "onChange" принимает введенное пользователем значение (e.target.value) и передает его родительскому компоненту или другой функции для дальнейшей обработки. Например, в вашем коде значение, введенное в поле фильтрации по имени, передается в родительский компонент (вероятно, компонент, содержащий список контактов) и используется для фильтрации контактов по имени.

export default Filter;
