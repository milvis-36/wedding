import { MD5 } from './md5.js'

const buttonId = 'btn-password'
const passwordInputId = 'input-password'
const enterKey = 'Enter'
const passwordLocalStorageKey = 'pswd'

const notAllowed = (input) => {
  alert('Nepovoleno')
  input.value = ''
}

const showPasswordInput = (guestRootSelector) => {
  const content = document.querySelector(`${guestRootSelector} > div`)
  content.classList.remove('invisible')
}

const handleSubmit = (guestRootSelector, value) => {
  const input = document.querySelector(`#${passwordInputId}`)
  const password = input.value || value

  if (!password) {
    alert('Vyplňte prosím heslo')
    return
  }

  fetch('./data/guests.json')
    .then((r) => {
      if (!r.ok) {
        notAllowed(input)
        return
      }

      return r.json()
    })
    .then((data) => {
      if (!data) {
        return
      }
      const { content, hash } = data

      if (hash !== MD5(password)) {
        notAllowed(input)
        showPasswordInput(guestRootSelector)
        return
      }

      localStorage.setItem(passwordLocalStorageKey, password)

      const rootElement = document.querySelector(guestRootSelector)
      rootElement.innerHTML = content
    })
}

const getQueryParamValue = (param) => {
  const search = document.location.search.substring(1)
  for (const pair of search.split('&')) {
    const [name, value] = pair.split('=')

    if (name === param) {
      return value
    }
  }
}

const autoLogin = (guestRootSelector) => {
  const stored =
    localStorage.getItem(passwordLocalStorageKey) ||
    getQueryParamValue('pozvanka')
  if (stored) {
    handleSubmit(guestRootSelector, stored)
    return
  }
  showPasswordInput(guestRootSelector)
}

export const guestsModule = (guestRootSelector) => {
  window.addEventListener('click', (e) => {
    if (e.target.id !== buttonId) {
      return
    }
    handleSubmit(guestRootSelector)
  })

  window.addEventListener('keyup', (e) => {
    console.log(e.key)
    if (e.target.id !== passwordInputId || e.key !== enterKey) {
      return
    }
    handleSubmit(guestRootSelector)
  })

  autoLogin(guestRootSelector)
}
