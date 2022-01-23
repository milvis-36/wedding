const notificationRootSelector = '.notification-div'
const localStorageKey = 'notif'

export const notificationModule = (url) => {
  const target = document.querySelector(notificationRootSelector)

  fetch(url)
    .then((r) => {
      if (!r.ok) {
        return
      }

      return r.json()
    })
    .then((data) => {
      if (!data || !data.id) {
        return
      }

      document
        .querySelector('.toggle-notification')
        .classList.remove('invisible')

      const { id, content } = data
      target.querySelector('.notification-content').innerHTML = content
      const readNotificationId = localStorage.getItem(localStorageKey)
      if (id === readNotificationId) {
        return
      }

      target.dataset.id = id
      target.classList.add('show')
    })
}

window.addEventListener('click', (e) => {
  const { target } = e
  if (target.matches(`${notificationRootSelector} .btn.btn-close`)) {
    localStorage.setItem(
      localStorageKey,
      document.querySelector(notificationRootSelector).dataset.id
    )
    return
  }
})
