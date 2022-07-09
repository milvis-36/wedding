let weddingDate

export const countdownModule = (date) => {
  weddingDate = date

  calcTimeRemaining()
  setInterval(() => {
    calcTimeRemaining()
  }, 1000)
}

export const calcTimeRemaining = () => {
  const countdownDivElement = document.querySelector('.countdown-div')
  if (!countdownDivElement) {
    return
  }
  const countdownElement = countdownDivElement.querySelector('#countdown')
  countdownDivElement.classList.remove('invisible')

  // get total seconds between the times
  let delta = (weddingDate - new Date().getTime()) / 1000

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400)

  if (delta <= 0) {
    countdownElement &&
      (countdownElement.textContent = `Už jsme svoji ${days * -1} dnů!`)
    return
  }
  delta -= days * 86400

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  // what's left is seconds
  const seconds = Math.round(delta % 60)

  countdownElement &&
    (countdownElement.textContent = `${days} dnů ${hours} hodin ${minutes} minut ${seconds} sekund`)
}
