//
// charts.js
// Theme module
//

'use strict'
;(function () {
  //
  // Variables
  //

  const colors = {
    gray: {
      300: '#E3EBF6',
      600: '#95AAC9',
      700: '#6E84A3',
      800: '#152E4D',
      900: '#283E59',
    },
    primary: {
      100: '#D2DDEC',
      300: '#A6C5F7',
      700: '#2C7BE5',
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  }

  const fonts = {
    base: 'Cerebri Sans',
  }

  const toggles = document.querySelectorAll('[data-toggle="chart"]')
  const legends = document.querySelectorAll('[data-toggle="legend"]')

  //
  // Functions
  //

  function globalOptions() {
    // Global
    Chart.defaults.global.responsive = true
    Chart.defaults.global.maintainAspectRatio = false

    // Default
    Chart.defaults.global.defaultColor = colors.gray[600]
    Chart.defaults.global.defaultFontColor = colors.gray[600]
    Chart.defaults.global.defaultFontFamily = fonts.base
    Chart.defaults.global.defaultFontSize = 13

    // Layout
    Chart.defaults.global.layout.padding = 0

    // Legend
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.legend.position = 'bottom'
    Chart.defaults.global.legend.labels.usePointStyle = true
    Chart.defaults.global.legend.labels.padding = 16

    // Point
    Chart.defaults.global.elements.point.radius = 0
    Chart.defaults.global.elements.point.backgroundColor = colors.primary[700]

    // Line
    Chart.defaults.global.elements.line.tension = 0.4
    Chart.defaults.global.elements.line.borderWidth = 3
    Chart.defaults.global.elements.line.borderColor = colors.primary[700]
    Chart.defaults.global.elements.line.backgroundColor = colors.transparent
    Chart.defaults.global.elements.line.borderCapStyle = 'rounded'

    // Rectangle
    Chart.defaults.global.elements.rectangle.backgroundColor =
      colors.primary[700]
    Chart.defaults.global.elements.rectangle.maxBarThickness = 10

    // Arc
    Chart.defaults.global.elements.arc.backgroundColor = colors.primary[700]
    Chart.defaults.global.elements.arc.borderColor = colors.white
    Chart.defaults.global.elements.arc.borderWidth = 4
    Chart.defaults.global.elements.arc.hoverBorderColor = colors.white

    // Tooltips
    Chart.defaults.global.tooltips.enabled = false
    Chart.defaults.global.tooltips.mode = 'index'
    Chart.defaults.global.tooltips.intersect = false
    Chart.defaults.global.tooltips.custom = function (model) {
      let tooltip = document.getElementById('chart-tooltip')
      const chartType = this._chart.config.type

      // Create tooltip if doesn't exist
      if (!tooltip) {
        tooltip = document.createElement('div')

        tooltip.setAttribute('id', 'chart-tooltip')
        tooltip.setAttribute('role', 'tooltip')
        tooltip.classList.add('popover')
        tooltip.classList.add('bs-popover-top')

        document.body.appendChild(tooltip)
      }

      // Hide tooltip if not visible
      if (model.opacity === 0) {
        tooltip.style.visibility = 'hidden'

        return
      }

      if (model.body) {
        const title = model.title || []
        const body = model.body.map(function (body) {
          return body.lines
        })

        // Add arrow
        let content = '<div class="arrow"></div>'

        // Add title
        title.forEach(function (title) {
          content += '<h3 class="popover-header text-center">' + title + '</h3>'
        })

        // Add content
        body.forEach(function (body, i) {
          const colors = model.labelColors[i]
          const indicatorColor =
            chartType === 'line' && colors.borderColor !== 'rgba(0,0,0,0.1)'
              ? colors.borderColor
              : colors.backgroundColor
          const indicator =
            '<span class="popover-body-indicator" style="background-color: ' +
            indicatorColor +
            '"></span>'
          const justifyContent =
            body.length > 1 ? 'justify-content-left' : 'justify-content-center'

          content +=
            '<div class="popover-body d-flex align-items-center ' +
            justifyContent +
            '">' +
            indicator +
            body +
            '</div>'
        })

        tooltip.innerHTML = content
      }

      const canvas = this._chart.canvas
      const canvasRect = canvas.getBoundingClientRect()

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      const scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0

      const canvasTop = canvasRect.top + scrollTop
      const canvasLeft = canvasRect.left + scrollLeft

      const tooltipWidth = tooltip.offsetWidth
      const tooltipHeight = tooltip.offsetHeight

      const top = canvasTop + model.caretY - tooltipHeight - 16
      const left = canvasLeft + model.caretX - tooltipWidth / 2

      tooltip.style.top = top + 'px'
      tooltip.style.left = left + 'px'
      tooltip.style.visibility = 'visible'
    }

    Chart.defaults.global.tooltips.callbacks.label = function (item, data) {
      let content = ''

      const value = item.yLabel
      const dataset = data.datasets[item.datasetIndex]
      const label = dataset.label

      const yAxisID = dataset.yAxisID ? dataset.yAxisID : 0
      const yAxes = this._chart.options.scales.yAxes
      var yAxis = yAxes[0]

      if (yAxisID) {
        var yAxis = yAxes.filter(function (item) {
          return item.id == yAxisID
        })[0]
      }

      const callback = yAxis.ticks.callback

      const activeDatasets = data.datasets.filter(function (dataset) {
        return !dataset.hidden
      })

      if (activeDatasets.length > 1) {
        content =
          '<span class="popover-body-label mr-auto">' + label + '</span>'
      }

      content +=
        '<span class="popover-body-value">' + callback(value) + '</span>'

      return content
    }

    // Doughnut
    Chart.defaults.doughnut.cutoutPercentage = 83
    Chart.defaults.doughnut.tooltips.callbacks.title = function (item, data) {
      return data.labels[item[0].index]
    }
    Chart.defaults.doughnut.tooltips.callbacks.label = function (item, data) {
      const value = data.datasets[0].data[item.index]
      const callbacks = this._chart.options.tooltips.callbacks
      const afterLabel = callbacks.afterLabel() ? callbacks.afterLabel() : ''
      const beforeLabel = callbacks.beforeLabel() ? callbacks.beforeLabel() : ''

      return (
        '<span class="popover-body-value">' +
        beforeLabel +
        value +
        afterLabel +
        '</span>'
      )
    }
    Chart.defaults.doughnut.legendCallback = function (chart) {
      const data = chart.data
      let content = ''

      data.labels.forEach(function (label, index) {
        const bgColor = data.datasets[0].backgroundColor[index]

        content += '<span class="chart-legend-item">'
        content +=
          '<i class="chart-legend-indicator" style="background-color: ' +
          bgColor +
          '"></i>'
        content += label
        content += '</span>'
      })

      return content
    }

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: colors.gray[300],
        drawBorder: false,
        drawTicks: false,
        zeroLineColor: colors.gray[300],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2],
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        stepSize: 10,
      },
    })

    // xAxes
    Chart.scaleService.updateScaleDefaults('category', {
      gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        padding: 20,
      },
    })
  }

  function getChartInstance(chart) {
    let chartInstance

    Chart.helpers.each(Chart.instances, function (instance) {
      if (chart == instance.chart.canvas) {
        chartInstance = instance
      }
    })

    return chartInstance
  }

  function toggleDataset(toggle) {
    const id = toggle.dataset.target
    const action = toggle.dataset.action
    const index = parseInt(toggle.dataset.dataset)

    const chart = document.querySelector(id)
    const chartInstance = getChartInstance(chart)

    // Action: Toggle
    if (action === 'toggle') {
      const datasets = chartInstance.data.datasets

      const activeDataset = datasets.filter(function (dataset) {
        return !dataset.hidden
      })[0]

      let backupDataset = datasets.filter(function (dataset) {
        return dataset.order === 1000
      })[0]

      // Backup active dataset
      if (!backupDataset) {
        backupDataset = {}

        for (var prop in activeDataset) {
          if (prop !== '_meta') {
            backupDataset[prop] = activeDataset[prop]
          }
        }

        backupDataset.order = 1000
        backupDataset.hidden = true

        // Push to the dataset list
        datasets.push(backupDataset)
      }

      // Toggle dataset
      const sourceDataset =
        datasets[index] === activeDataset ? backupDataset : datasets[index]

      for (var prop in activeDataset) {
        if (prop !== '_meta') {
          activeDataset[prop] = sourceDataset[prop]
        }
      }

      // Update chart
      chartInstance.update()
    }

    // Action: Add
    if (action === 'add') {
      const dataset = chartInstance.data.datasets[index]
      const isHidden = dataset.hidden

      // Toggle dataset
      dataset.hidden = !isHidden
    }

    // Update chart
    chartInstance.update()
  }

  function toggleLegend(legend) {
    const chart = getChartInstance(legend)
    const content = chart.generateLegend()

    const id = legend.dataset.target
    const container = document.querySelector(id)

    container.innerHTML = content
  }

  //
  // Events
  //

  if (typeof Chart !== 'undefined') {
    // Global options
    globalOptions()

    // Toggle dataset
    if (toggles) {
      ;[].forEach.call(toggles, function (toggle) {
        const event = toggle.dataset.trigger

        toggle.addEventListener(event, function () {
          toggleDataset(toggle)
        })
      })
    }

    // Toggle legend
    if (legends) {
      document.addEventListener('DOMContentLoaded', function () {
        ;[].forEach.call(legends, function (legend) {
          toggleLegend(legend)
        })
      })
    }
  }
})()
