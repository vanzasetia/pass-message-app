(function () {
  'use strict';
  /** * DOM ELEMENTS ***/
  const themeBtn = document.querySelector('.js-themeBtn');
  const bodyEl = document.querySelector('.js-bodyEl');
  const formEl = document.querySelector('.js-formEl');
  const alertEl = document.querySelector('.js-alertEl');
  const inputEl = document.querySelector('.js-inputEl');
  const messageEl = document.querySelector('.js-messageEl');

  /** * APP VARIABLES SETUP ***/
  const isPreferDarkMode = matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const alertMsg = 'Please write your message';
  const initialMsg = 'A message you would like to save';
  const defaultMsg = 'I hope you like it! 😉';

  /** * FUNCTIONS ***/
  const setTheme = () => {
    if (isPreferDarkMode) {
      bodyEl.classList.add('is-dark');
    }
  };
  const changeTheme = () => {
    bodyEl.classList.toggle('is-dark');
  };
  const validateMessage = message => {
    const regex = /\S/g;
    return regex.test(message);
  };
  const setToInitialState = defaultStr => {
    alertEl.removeAttribute('aria-live');
    alertEl.textContent = defaultStr;
    inputEl.classList.remove('app__input--invalid');
  };
  const alertUser = (alertStr, initialStr) => {
    alertEl.setAttribute('aria-live', 'assertive');
    alertEl.textContent = alertStr;
    inputEl.classList.add('app__input--invalid');
    setTimeout(() => {
      setToInitialState(initialStr);
    }, 2500);
  };
  const renderMessage = message => {
    messageEl.textContent = message;
  };
  const showMessage = e => {
    e.preventDefault();
    const messageText = inputEl.value;
    if (validateMessage(messageText)) {
      renderMessage(messageText);
      localStorage.setItem('savedMessage', messageText);
    } else {
      alertUser(alertMsg, initialMsg);
    }
    inputEl.value = '';
  };
  const setApp = () => {
    setTheme();
    const lastMessage = localStorage.getItem('savedMessage')
      ? localStorage.getItem('savedMessage')
      : defaultMsg;
    renderMessage(lastMessage);
  };

  /** * ADDEVENTLISTNERS ***/
  document.addEventListener('DOMContentLoaded', setApp);
  themeBtn.addEventListener('click', changeTheme);
  formEl.addEventListener('submit', showMessage);
})();
