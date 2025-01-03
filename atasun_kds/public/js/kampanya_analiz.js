document.addEventListener('DOMContentLoaded', () => {
    const campaignForm = document.getElementById('campaign-filter-form');
    const campaignChartCtx = document.getElementById('campaignComparisonChart').getContext('2d');
    let campaignChart;

    // Kampanya performansı verilerini alıp grafikle göster
    async function loadCampaignChart(year = '2024') {
        try {
            const response = await fetch(`/api/campaign-performance?year=${year}`);
            if (!response.ok) throw new Error('API Hatası');
            const data = await response.json();

            const labels = data.map((item) => item.campaign_name); // Kampanya adları
            const earningsData = data.map((item) => item.total_earnings); // Toplam kazanç

            if (campaignChart) {
                campaignChart.destroy(); // Önceki grafiği yok et
            }

            // Grafik oluştur
            campaignChart = new Chart(campaignChartCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Toplam Kazanç (₺)',
                            data: earningsData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Kampanyalar',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Toplam Kazanç (₺)',
                            },
                        },
                    },
                },
            });
        } catch (err) {
            console.error('API Hatası:', err);
        }
    }

    // Sayfa açıldığında otomatik olarak 2024 yılı için yükle
    loadCampaignChart('2024');

    // Kampanya filtreleme
    campaignForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const year = document.getElementById('campaign-year').value;
        loadCampaignChart(year);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // Manuel olarak verilen kampanya kar verileri
  const campaignData = [
      { kampanya_ad: "2 Al 1 Öde 2024", kar: 33088231 },
      { kampanya_ad: "3 Al 2 Öde 2024", kar: 36689154 },
      { kampanya_ad: "2 Al 1 Öde 2023", kar: 32019199 },
      { kampanya_ad: "3 Al 2 Öde 2023", kar: 43319800 },
      { kampanya_ad: "2 Al 1 Öde 2022", kar: 23108673 },
      { kampanya_ad: "3 Al 2 Öde 2022", kar: 41738884 },
      { kampanya_ad: "2 Al 1 Öde 2021", kar: 23092425 },
      { kampanya_ad: "3 Al 2 Öde 2021", kar: 35565058 },
      { kampanya_ad: "2 Al 1 Öde 2020", kar: 83029154 },
      { kampanya_ad: "3 Al 2 Öde 2020", kar: 30341218 }
  ];

  // Kampanya adları ve kar verilerini alıyoruz
  const labels = campaignData.map(item => item.kampanya_ad);
  const profitValues = campaignData.map(item => item.kar);

  // Kampanyalar arası kar karşılaştırma grafiği
  const comparisonCtx = document.getElementById('campaignProfitChart').getContext('2d');
  new Chart(comparisonCtx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Kampanya Karları (TL)',
              data: profitValues,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bar rengi
              borderColor: 'rgba(54, 162, 235, 1)',    // Çerçeve rengi
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});









