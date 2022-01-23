export const navigationModule = (navItemSelector, menuButtonSelector) => {
  window.addEventListener('click', (e) => {
    const { target } = e
    if (!target.matches(menuButtonSelector)) {
      return
    }

    target.scrollIntoView()
  })

  window.addEventListener('click', (e) => {
    const { target } = e
    if (!target || !target.matches(navItemSelector)) {
      return
    }

    const { href } = target
    const location = href.split('#')[1]

    document.querySelectorAll('.nav-item.active').forEach((active) => {
      active.classList.remove('active')
    })

    document.querySelectorAll('.dropdown-item.active').forEach((active) => {
      active.classList.remove('active')
    })

    document
      .querySelectorAll(`.nav-link[href="#${location}"]`)
      .forEach((selected) => {
        selected.closest('li').classList.add('active')
      })
  })
}
