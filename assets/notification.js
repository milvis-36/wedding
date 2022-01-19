const notificationRootSelector = '.notification-div'
const localStorageKey = 'notif'

export const fetchNotification = (url) => {
  const target = document.querySelector(notificationRootSelector)

  fetch(url)
    .then((r) => {
      if (!r.ok) {
        return
      }

      return r.json()
    })
    .then((data) => {
      if (!data) {
        return
      }

      const { id, content } = data
      const readNotificationId = localStorage.getItem(localStorageKey)
      if (id === readNotificationId) {
        return
      }

      target.dataset.id = id
      target.classList.remove('invisible')
      target.querySelector('.notification-content').textContent = content
    })
}

window.addEventListener('click', (e) => {
  if (
    e.target !==
    document.querySelector(`${notificationRootSelector} .btn.btn-close`)
  ) {
    return
  }

  localStorage.setItem(
    localStorageKey,
    document.querySelector(notificationRootSelector).dataset.id
  )
})
