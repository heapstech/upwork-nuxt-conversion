//
// dropdowns.js
//

'use strict'
;(function () {
  const dropdowns = document.querySelectorAll(
    '.dropup, .dropright, .dropdown, .dropleft'
  )
  const events = ['click']

  function toggleDropdown(e, dropdown) {
    const parentMenu = dropdown.closest('.dropdown-menu')

    if (parentMenu) {
      e.preventDefault()
      e.stopPropagation()

      const currentMenu = dropdown.querySelector('.dropdown-menu')
      const siblingMenus = parentMenu.querySelectorAll('.dropdown-menu')

      ;[].forEach.call(siblingMenus, function (menu) {
        if (menu !== currentMenu) {
          menu.classList.remove('show')
        }
      })

      currentMenu.classList.toggle('show')
    }
  }

  function hideDropdowns(dropdown) {
    const currentMenu = dropdown.querySelector('.dropdown-menu')
    const nestedMenus = currentMenu.querySelectorAll('.dropdown-menu')

    if (nestedMenus) {
      ;[].forEach.call(nestedMenus, function (menu) {
        menu.classList.remove('show')
      })
    }
  }

  ;[].forEach.call(dropdowns, function (dropdown) {
    const toggle = dropdown.querySelector('[data-toggle="dropdown"]')

    if (toggle) {
      toggle.addEventListener(events[0], function (e) {
        toggleDropdown(e, dropdown)
      })
    }
  })

  $(dropdowns).on('hide.bs.dropdown', function () {
    hideDropdowns(this)
  })
})()
