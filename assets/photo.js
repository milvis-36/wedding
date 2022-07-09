const linkSelector = '.photo-joke'
const audioSelector = '#harmonica'
const localStorageKey = 'photo-joke'

export const photoModule = () => {
  if (localStorage.getItem(localStorageKey)) {
    return
  }

  localStorage.setItem(localStorageKey, '1')

  document.addEventListener('click', (e) => {
    if (!e.target.matches(linkSelector)) {
      return
    }
    document.querySelector(audioSelector).play()
  })
}
