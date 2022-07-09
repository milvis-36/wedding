import { countdownModule } from './countdown.js'
import { navigationModule } from './navigation.js'
import { notificationModule } from './notification.js'
import { photoModule } from './photo.js'
import { guestsModule } from './private.js'

const weddingDate = new Date(2022, 5, 25, 13, 0)

window.addEventListener('DOMContentLoaded', (e) => {
  countdownModule(weddingDate)
  notificationModule('./data/notification.json')
  navigationModule('.nav-link', '#mobileMenu')
  guestsModule('.right-content')
  photoModule()
})

window.addEventListener('click', (e) => {
  const { target } = e
  if (target.id === 'input-password') {
    target.scrollIntoView()
  }
})

let firstTouch = true
window.addEventListener('touchstart', (e) => {
  const { target } = e
  if (!firstTouch || !target.matches('.section-1')) {
    return
  }

  firstTouch = false
  target.scrollIntoView()
})
