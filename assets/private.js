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
  const content = document.querySelector(`${guestRootSelector} .section-login`)
  content && content.classList.remove('d-none')
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
      const { content, hash, seed, padding } = data

      if (hash !== MD5(password)) {
        notAllowed(input)
        showPasswordInput(guestRootSelector)
        return
      }

      localStorage.setItem(passwordLocalStorageKey, password)

      const iv = base64ToArrayBuffer(seed)
      const enc = base64ToArrayBuffer(content)
      const passPhrase =
        password.length < 16
          ? `${password}${padding.repeat(16 - password.length)}`
          : passPhrase
      const pkey = strEncodeUTF8(passPhrase)

      crypto.subtle
        .importKey('raw', pkey, 'AES-CBC', false, ['decrypt'])
        .then((key) => {
          window.crypto.subtle
            .decrypt(
              {
                name: 'AES-CBC',
                iv,
              },
              key,
              enc
            )
            .then((base64contentBytes) => {
              const rootElement = document.querySelector(guestRootSelector)
              rootElement.innerHTML = new TextDecoder().decode(
                base64contentBytes
              )
            })
        })
    })
}

const getQueryParamValue = (param) => {
  const search = document.location.search.substring(1)
  for (const pair of search.split('&')) {
    const [name, value] = pair.split('=')

    if (name === param) {
      history.replaceState(null, document.title, '/')
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

const base64ToArrayBuffer = (base64) => {
  const binary_string = window.atob(base64)
  return strEncodeUTF8(binary_string)
}

const strEncodeUTF8 = (str) => {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return bufView
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
