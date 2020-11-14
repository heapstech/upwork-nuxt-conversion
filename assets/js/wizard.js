//
// wizard.js
//

'use strict'
;(function () {
  const toggles = document.querySelectorAll('[data-toggle="wizard"]')

  ;[].forEach.call(toggles, function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault()

      // Toggle tab
      // eslint-disable-next-line no-undef
      $(toggle).tab('show').removeClass('active')
    })
  })
})()
