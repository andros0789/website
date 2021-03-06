/* global Chart */

const getCSSVariable = v => getComputedStyle(document.documentElement).getPropertyValue(v);

const bgMainColor = getCSSVariable('--bg-main-color').trim();
const fontMainColor = getCSSVariable('--font-main-color').trim();
const fontSecColor = getCSSVariable('--font-sec-color').trim();

Chart.defaults.fontSize = 16;
Chart.defaults.fontColor = fontMainColor;
Chart.defaults.fontFamily = 'Bender';
Chart.defaults.elements.line.backgroundColor = fontSecColor;
Chart.defaults.elements.point.hitRadius = 15;
Chart.defaults.tooltips.backgroundColor = bgMainColor;
Chart.defaults.tooltips.titleFontColor = fontSecColor;

const ammoTypeChart = () => {
  const el = document.getElementById('ammoTypeChart');
  if (el === null) return;

  const ctx = el.getContext('2d');

  const options = {
    type: 'scatter',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => `${data.labels[tooltipItem.datasetIndex]} (PEN: ${tooltipItem.label}, DMG: ${tooltipItem.value})`
        }
      },
      scales: {
        x: {
          scaleLabel: {
            display: true,
            labelString: 'Penetration',
          },
          gridLines: {
            color: 'rgba(150, 136, 103, .1)',
            drawBorder: false
          },
          type: 'linear',
          position: 'bottom'
        },
        y: {
          scaleLabel: {
            display: true,
            labelString: 'Damage',
          },
          gridLines: {
            color: 'rgba(150, 136, 103, .1)',
            drawBorder: false
          }
        }
      }
    }
  };

  const types = document.querySelectorAll('.item-table.ammo tr');
  for (const type of types) {
    if (!type.dataset.name) continue;
    const pen = parseInt(type.dataset.penetration);
    const dmg = parseInt(type.dataset.damage);
    const count = parseInt(type.dataset.projectilecount);
    const data = {
      label: type.dataset.name,
      borderColor: fontMainColor,
      backgroundColor: fontMainColor,
      data: [{
        x: pen,
        y: count * dmg || dmg
      }]
    };
    options.data.labels.push(data.label);
    options.data.datasets.push(data);
  }

  const element = document.querySelector('.chart.ammo');

  const intersectionHandler = entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      new Chart(ctx, options);
      observer.unobserve(element);
    }
  });

  const intersectionOptions = { threshold: 0.3 };

  const observer = new IntersectionObserver(intersectionHandler, intersectionOptions);

  observer.observe(element);
};

ammoTypeChart();
