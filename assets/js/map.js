//
// map.js
// Theme module
//

;(function () {
  //
  // Variables
  //

  const map = document.querySelectorAll('[data-toggle="map"]')
  const accessToken =
    'pk.eyJ1IjoiZ29vZHRoZW1lcyIsImEiOiJjanU5eHR4N2cybDU5NGVwOHZwNGprb3E0In0.msdw9q16dh8v4azJXUdiXg'

  //
  // Methods
  //

  function init(el) {
    let elementOptions = el.dataset.options
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {}

    const defaultOptions = {
      container: el,
      style: 'mapbox://styles/mapbox/light-v9',
      scrollZoom: false,
      interactive: false,
    }

    const options = Object.assign(defaultOptions, elementOptions)

    // Get access token
    mapboxgl.accessToken = accessToken

    // Init map
    new mapboxgl.Map(options)
  }

  //
  // Events
  //

  if (typeof mapboxgl !== 'undefined' && map) {
    ;[].forEach.call(map, function (el) {
      init(el)
    })
  }
})()
