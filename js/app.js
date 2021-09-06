(function () {
  'use strict'
  /*** DOM ELEMENTS ***/
  const themeBtn = document.querySelector('.js-themeBtn')
  const bodyEl = document.querySelector('.js-bodyEl')
  const formEl = document.querySelector('.js-formEl')
  const alertEl = document.querySelector('.js-alertEl')
  const inputEl = document.querySelector('.js-inputEl')
  const messageEl = document.querySelector('.js-messageEl')

  /*** APP VARIABLES SETUP ***/
  const isPreferDarkMode = matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const alertMsg = 'Please write your message'
  const initialMsg = 'A message you would like to save'

  /*** FUNCTIONS ***/
  const setTheme = () => {
    if (isPreferDarkMode) {
      /* Add is-dark class to body element */
      bodyEl.classList.add('is-dark')
    }
  }
  const changeTheme = () => {
    /* Toggle is-dark class on body element */
    bodyEl.classList.toggle('is-dark')
  }
  const validateMessage = message => {
    const regex = /\S/g
    return regex.test(message)
  }
  const setToInitialState = str => {
    alertEl.removeAttribute('aria-live')
    alertEl.textContent = str
    inputEl.classList.remove('app__input--invalid')
  }
  const alertUser = (alertStr, initialStr) => {
    alertEl.setAttribute('aria-live', 'assertive')
    alertEl.textContent = alertStr
    inputEl.classList.add('app__input--invalid')
    setTimeout(() => {
      setToInitialState(initialStr)
    }, 2500)
  }
  const renderMessage = e => {
    /**
     * 1. Prevent the default form submit behavior
     * 2. Get the value from the input element
     */
    e.preventDefault() /* 1 */
    const messageText = inputEl.value /* 2 */
    if (validateMessage(messageText)) {
      messageEl.textContent = messageText
      inputEl.value = ''
      localStorage.setItem("savedMessage", messageText)
    } else {
      alertUser(alertMsg, initialMsg)
    }
  }
  const setApp = () => {
    setTheme()
    const lastMessage = localStorage.getItem("savedMessage") ? localStorage.getItem("savedMessage") : "I hope you like it! 😉"
    messageEl.textContent = lastMessage
  }

  /*** ADDEVENTLISTNERS ***/
  document.addEventListener('DOMContentLoaded', setApp)
  themeBtn.addEventListener('click', changeTheme)
  formEl.addEventListener('submit', renderMessage)
})()
