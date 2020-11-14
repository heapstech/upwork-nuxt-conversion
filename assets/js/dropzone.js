// //
// // dropzone.js
// // Theme module
// //
//
// 'use strict'
// ;(function () {
//   //
//   // Variables
//   //
//
//   const toggle = document.querySelectorAll('[data-toggle="dropzone"]')
//
//   //
//   // Functions
//   //
//
//   function globalOptions() {
//     Dropzone.autoDiscover = false
//     Dropzone.thumbnailWidth = null
//     Dropzone.thumbnailHeight = null
//   }
//
//   function init(el) {
//     let currentFile
//
//     let elementOptions = el.dataset.options
//     elementOptions = elementOptions ? JSON.parse(elementOptions) : {}
//
//     const defaultOptions = {
//       previewsContainer: el.querySelector('.dz-preview'),
//       previewTemplate: el.querySelector('.dz-preview').innerHTML,
//       init() {
//         this.on('addedfile', function (file) {
//           const maxFiles = elementOptions.maxFiles
//           if (maxFiles == 1 && currentFile) {
//             this.removeFile(currentFile)
//           }
//           currentFile = file
//         })
//       },
//     }
//     const options = Object.assign(defaultOptions, elementOptions)
//
//     // Clear preview
//     el.querySelector('.dz-preview').innerHTML = ''
//
//     // Init dropzone
//     new Dropzone(el, options)
//   }
//
//   //
//   // Events
//   //
//
//   if (typeof Dropzone !== 'undefined' && toggle) {
//     globalOptions()
//     ;[].forEach.call(toggle, function (el) {
//       init(el)
//     })
//   }
// })()
