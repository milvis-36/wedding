import { guestsModule } from './guests.js'
import { fetchNotification } from './notification.js'

const weddingDate = new Date(2022, 6, 24, 13, 0)
let countdownElement

const calcTimeRemaining = () => {
  // get total seconds between the times
  let delta = (weddingDate - new Date().getTime()) / 1000
  if (delta <= 0) {
    countdownElement.textContent = 'Svatba proběhla'
    return
  }

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  // what's left is seconds
  const seconds = Math.round(delta % 60)

  countdownElement.textContent = `${days} dnů ${hours} hodin ${minutes} minut ${seconds} sekund`
}

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.wedding-date').textContent =
    weddingDate.toLocaleString()

  countdownElement = document.querySelector('#countdown')
  calcTimeRemaining()
  setInterval(() => {
    calcTimeRemaining()
  }, 1000)

  fetchNotification('./data/notification.json')
  guestsModule('.right-content')

  // fetch('./data/test.html').then((r) => console.log(r))
})
