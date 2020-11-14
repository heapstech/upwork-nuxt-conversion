//
// kanban.js
// Dashkit module
//

'use strict'
;(function () {
  //
  // Variables
  //

  const categories = document.querySelectorAll('.kanban-category')
  const links = document.querySelectorAll('.kanban-add-link')
  const forms = document.querySelectorAll('.kanban-add-form')

  //
  // Functions
  //

  function init(categories) {
    new Draggable.Sortable(categories, {
      draggable: '.kanban-item',
      mirror: {
        constrainDimensions: true,
      },
    })
  }

  function toggleItems(el) {
    const parent = el.closest('.kanban-add')
    const card = parent.querySelector('.card')
    const link = parent.querySelector('.kanban-add-link')
    const form = parent.querySelector('.kanban-add-form')

    link.classList.toggle('d-none')
    form.classList.toggle('d-none')

    if (card) {
      if (card.classList.contains('card-sm')) {
        if (card.classList.contains('card-flush')) {
          card.classList.remove('card-flush')
        } else {
          card.classList.add('card-flush')
        }
      }
    }
  }

  //
  // Events
  //

  if (typeof Draggable !== 'undefined' && categories) {
    init(categories)
  }

  if (links) {
    ;[].forEach.call(links, function (el) {
      el.addEventListener('click', function () {
        toggleItems(el)
      })
    })
  }

  if (forms) {
    ;[].forEach.call(forms, function (el) {
      // Reset
      el.addEventListener('reset', function () {
        toggleItems(el)
      })

      // Submit
      el.addEventListener('submit', function (e) {
        e.preventDefault()
      })
    })
  }
})()
