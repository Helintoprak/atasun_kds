document.addEventListener('DOMContentLoaded', () => {
    const topSalesForm = document.getElementById('top-sales-form');
    const lowestSalesForm = document.getElementById('lowest-sales-form');
    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    const branchChartCtx = document.getElementById('branchChart').getContext('2d');

    let salesChart;
    let branchChart;

    // En çok satış yapan şubeler grafiği yükleme fonksiyonu
    const loadTopSalesChart = (year) => {
        fetch(`/api/top-sales?year=${year}`)
            .then((response) => {
                if (!response.ok) throw new Error('En çok satış yapan şubeler verisi alınamadı.');
                return response.json();
            })
            .then((data) => {
                const labels = data.map((item) => item.branch_name);
                const salesData = data.map((item) => item.total_sales);

                if (salesChart) salesChart.destroy();

                salesChart = new Chart(salesChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Toplam Satış',
                                data: salesData,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
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
                                ticks: {
                                    autoSkip: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Şubeler',
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Satış Miktarı',
                                },
                            },
                        },
                    },
                });
            })
            .catch((err) => console.error(err));
    };

    // En az satış yapan şubeler grafiği yükleme fonksiyonu
    const loadLowestSalesChart = (year) => {
        fetch(`/api/lowest-sales?year=${year}`)
            .then((response) => {
                if (!response.ok) throw new Error('En az satış yapan şubeler verisi alınamadı.');
                return response.json();
            })
            .then((data) => {
                const labels = data.map((item) => item.branch_name);
                const salesData = data.map((item) => item.total_sales);

                if (branchChart) branchChart.destroy();

                branchChart = new Chart(branchChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Toplam Satış',
                                data: salesData,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgba(255, 159, 64, 1)',
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
                                ticks: {
                                    autoSkip: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Şubeler',
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Satış Miktarı',
                                },
                            },
                        },
                    },
                });
            })
            .catch((err) => console.error(err));
    };

    // Sayfa açıldığında 2024 yılı için verileri yükle
    loadTopSalesChart('2024');
    loadLowestSalesChart('2024');

    // Kullanıcı yıl seçerek En çok satış yapan şubeler grafiğini filtreler
    topSalesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const year = document.getElementById('top-sales-year').value;
        loadTopSalesChart(year);
    });

    // Kullanıcı yıl seçerek En az satış yapan şubeler grafiğini filtreler
    lowestSalesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const year = document.getElementById('lowest-sales-year').value;
        loadLowestSalesChart(year);
    });
});
