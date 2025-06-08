// Animation counters
function animateCounter(id, target) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = current.toFixed(1) + "%";
  }, 20);
}

// Initialize counters on page load
window.addEventListener("load", function () {
  setTimeout(function () {
    animateCounter("pemahaman-counter", 87.5);
    animateCounter("penerapan-counter", 25);
    animateCounter("sejarah-counter", 87.5);
    animateCounter("sila-counter", 75);
  }, 500);
});

// Chart configurations
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
  },
  animation: {
    duration: 2000,
    easing: "easeInOutQuart",
  },
};

// Initialize charts
let charts = {};

function initCharts() {
  // Pemahaman Chart
  const pemahamanCtx = document
    .getElementById("pemahamanChart")
    .getContext("2d");
  charts.pemahaman = new Chart(pemahamanCtx, {
    type: "doughnut",
    data: {
      labels: ["Benar-benar Paham", "Kurang Memahami", "Tidak Tahu"],
      datasets: [
        {
          data: [87.5, 12.5, 0],
          backgroundColor: ["#667eea", "#764ba2", "#f093fb"],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: chartOptions,
  });

  // Penerapan Chart
  const penerapanCtx = document
    .getElementById("penerapanChart")
    .getContext("2d");
  charts.penerapan = new Chart(penerapanCtx, {
    type: "pie",
    data: {
      labels: ["Sangat Sering", "Sering", "Jarang", "Tidak Pernah"],
      datasets: [
        {
          data: [25, 37.5, 37.5, 0],
          backgroundColor: ["#667eea", "#4facfe", "#00f2fe", "#f093fb"],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: chartOptions,
  });

  // Sila Chart
  const silaCtx = document.getElementById("silaChart").getContext("2d");
  charts.sila = new Chart(silaCtx, {
    type: "bar",
    data: {
      labels: ["Sila 1", "Sila 2", "Sila 3", "Sila 4", "Sila 5"],
      datasets: [
        {
          label: "Tingkat Penerapan (%)",
          data: [75, 75, 37.5, 37.5, 37.5],
          backgroundColor: [
            "rgba(102, 126, 234, 0.8)",
            "rgba(118, 75, 162, 0.8)",
            "rgba(79, 172, 254, 0.8)",
            "rgba(0, 242, 254, 0.8)",
            "rgba(240, 147, 251, 0.8)",
          ],
          borderColor: ["#667eea", "#764ba2", "#4facfe", "#00f2fe", "#f093fb"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      ...chartOptions,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });

  // Demografi Chart
  const demografiCtx = document
    .getElementById("demografiChart")
    .getContext("2d");
  charts.demografi = new Chart(demografiCtx, {
    type: "polarArea",
    data: {
      labels: ["<13 tahun", "13-17 tahun", "18-22 tahun", "23-30 tahun"],
      datasets: [
        {
          data: [12.5, 12.5, 37.5, 37.5],
          backgroundColor: [
            "rgba(102, 126, 234, 0.6)",
            "rgba(118, 75, 162, 0.6)",
            "rgba(79, 172, 254, 0.6)",
            "rgba(240, 147, 251, 0.6)",
          ],
          borderColor: ["#667eea", "#764ba2", "#4facfe", "#f093fb"],
          borderWidth: 2,
        },
      ],
    },
    options: chartOptions,
  });
}

// Animate specific chart
function animateChart(chartId) {
  const chartName = chartId.replace("Chart", "");
  if (charts[chartName]) {
    charts[chartName].update("active");
  }
}

// Modal functions
function showDetails(type) {
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("modalContent");

  let modalData = {
    pemahaman: {
      title: "📚 Detail Pemahaman Pancasila",
      content: `
                        <h3>Tingkat Pemahaman Responden:</h3>
                        <ul style="line-height: 2;">
                            <li><strong>87.5%</strong> - Benar-benar memahami konsep dan nilai Pancasila</li>
                            <li><strong>12.5%</strong> - Pernah mendengar tapi kurang memahami secara mendalam</li>
                            <li><strong>0%</strong> - Tidak mengetahui sama sekali tentang Pancasila</li>
                        </ul>
                        <p style="margin-top: 15px;"><em>Hasil menunjukkan fondasi pengetahuan yang kuat di masyarakat.</em></p>
                    `,
    },
    penerapan: {
      title: "⚡ Detail Penerapan Nilai Pancasila",
      content: `
                        <h3>Frequency Penerapan dalam Kehidupan:</h3>
                        <ul style="line-height: 2;">
                            <li><strong>25%</strong> - Sangat sering menerapkan nilai Pancasila</li>
                            <li><strong>37.5%</strong> - Sering menerapkan dalam aktivitas harian</li>
                            <li><strong>37.5%</strong> - Jarang menerapkan nilai-nilai tersebut</li>
                            <li><strong>0%</strong> - Tidak pernah menerapkan sama sekali</li>
                        </ul>
                        <p style="margin-top: 15px;"><em>Masih ada gap yang perlu dijembatani antara pengetahuan dan praktik.</em></p>
                    `,
    },
    sejarah: {
      title: "🏛️ Detail Pengetahuan Sejarah",
      content: `
                        <h3>Pengetahuan tentang Tokoh Sejarah:</h3>
                        <ul style="line-height: 2;">
                            <li><strong>87.5%</strong> - Mengetahui Soekarno sebagai tokoh pidato "Lahirnya Pancasila"</li>
                            <li><strong>12.5%</strong> - Tidak mengetahui tokoh yang menyampaikan pidato</li>
                            <li><strong>0%</strong> - Menjawab tokoh yang salah</li>
                        </ul>
                        <p style="margin-top: 15px;"><em>Edukasi sejarah cukup berhasil dalam menyampaikan tokoh-tokoh penting.</em></p>
                    `,
    },
    sila: {
      title: "⭐ Detail Penerapan Per Sila",
      content: `
                        <h3>Tingkat Penerapan Setiap Sila:</h3>
                        <ul style="line-height: 2;">
                            <li><strong>75%</strong> - Sila 1: Ketuhanan Yang Maha Esa</li>
                            <li><strong>75%</strong> - Sila 2: Kemanusiaan yang Adil dan Beradab</li>
                            <li><strong>37.5%</strong> - Sila 3: Persatuan Indonesia</li>
                            <li><strong>37.5%</strong> - Sila 4: Kerakyatan yang Dipimpin Hikmat Kebijaksanaan</li>
                            <li><strong>37.5%</strong> - Sila 5: Keadilan Sosial bagi Seluruh Rakyat Indonesia</li>
                        </ul>
                        <p style="margin-top: 15px;"><em>Sila 1 & 2 lebih mudah diterapkan, sementara sila 3-5 perlu penguatan.</em></p>
                    `,
    },
  };

  content.innerHTML = `
                <h2 style="color: #667eea; margin-bottom: 20px;">${modalData[type].title}</h2>
                ${modalData[type].content}
            `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("detailModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("detailModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Initialize charts when page loads
window.addEventListener("load", function () {
  setTimeout(initCharts, 1000);
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to metric tiles
  const metricTiles = document.querySelectorAll(".metric-tile");
  metricTiles.forEach((tile) => {
    tile.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.03)";
    });

    tile.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});
