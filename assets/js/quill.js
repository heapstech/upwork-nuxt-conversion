//
// quill.js
// Theme module
//

'use strict'
;(function () {
  //
  // Variables
  //

  const toggle = document.querySelectorAll('[data-toggle="quill"]')

  //
  // Functions
  //

  function init(el) {
    let elementOptions = el.dataset.options
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {}

    const defaultOptions = {
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'code', 'image'],
          [
            {
              list: 'ordered',
            },
            {
              list: 'bullet',
            },
          ],
        ],
      },
      theme: 'snow',
    }

    const options = Object.assign(defaultOptions, elementOptions)

    new Quill(el, options)
  }

  //
  // Events
  //

  if (typeof Quill !== 'undefined' && toggle) {
    ;[].forEach.call(toggle, function (el) {
      init(el)
    })
  }
})()
