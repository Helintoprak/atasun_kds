document.addEventListener("DOMContentLoaded", async () => {
    const salesChartCtx = document.getElementById("salesChart").getContext("2d");
    const branchChartCtx = document.getElementById("branchChart").getContext("2d");

    let salesChart, branchChart;

    // Şubeleri al ve şube seçim alanına ekle
    const branchSelect = document.getElementById("top-sales-branch");

    const response = await fetch("/api/branches");
    const branches = await response.json();

    // Şubeleri seçenekler olarak ekleyelim
    branches.forEach(branch => {
        const option1 = document.createElement("option");
        option1.value = branch.sube_id;
        option1.textContent = branch.sube_ad;
        branchSelect.appendChild(option1);
    });

    // Aylara Göre Karlar (İlk başta 2024 yılı ve 1. şube için)
    async function loadTopSalesChart(year = '2024', branch = '1') {
        const salesResponse = await fetch(`/api/sales?year=${year}&branch=${branch}`);
        const salesData = await salesResponse.json();

        const months = salesData.map(item => item.month);
        const profits = salesData.map(item => item.profit);

        if (salesChart) salesChart.destroy();

        salesChart = new Chart(salesChartCtx, {
            type: "bar",
            data: {
                labels: months,
                datasets: [{
                    label: `Şube ${branch} İçin ${year} Yılına Göre Aylık Karlar`,
                    data: profits,
                    borderWidth: 1,
                }],
            },
        });
    }

    // Yıllara Göre Şubelerin Toplam Karları (İlk başta 2024 yılı için)
    async function loadBranchSalesChart(year = '2024') {
        const branchResponse = await fetch(`/api/annual-profit?year=${year}`);
        const branchData = await branchResponse.json();

        const branches = branchData.map(item => item.branch_name);
        const profits = branchData.map(item => item.profit);

        if (branchChart) branchChart.destroy();

        branchChart = new Chart(branchChartCtx, {
            type: "bar",
            data: {
                labels: branches,
                datasets: [{
                    label: `${year} Yılı Şubelerin Toplam Karları`,
                    data: profits,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Sayfa açıldığında otomatik olarak 2024 yılı ve ilk şube ile yükle
    await loadTopSalesChart('2024', '1');  // 2024 yılı ve 1. şube için
    await loadBranchSalesChart('2024');  // 2024 yılı için

    // Aylara Göre Karlar Filtreleme
    document.getElementById("top-sales-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const year = document.getElementById("top-sales-year").value;
        const branch = document.getElementById("top-sales-branch").value;

        await loadTopSalesChart(year, branch);
    });

    // Yıllara Göre Şubelerin Toplam Karları Filtreleme
    document.getElementById("branch-sales-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const year = document.getElementById("branch-sales-year").value;

        await loadBranchSalesChart(year);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const districtData = [
        { name: "Konak", puan: 73.0 },
        { name: "Bornova", puan: 70.0 },
        { name: "Narlıdere", puan: 70.0 },
        { name: "Karşıyaka", puan: 64.0 },
        { name: "Karabağlar", puan: 60.5 },
        { name: "Buca", puan: 60.5 },
        { name: "Balçova", puan: 60.0 },
        { name: "Bayraklı", puan: 59.0 },
        { name: "Gaziemir", puan: 58.5 },
        { name: "Çiğli", puan: 58.5 },
        { name: "Aliağa", puan: 53.0 },
        { name: "Menemen", puan: 52.5 },
        { name: "Torbalı", puan: 52.5 },
        { name: "Menderes", puan: 52.5 },
        { name: "Urla", puan: 52.0 },
        { name: "Çeşme", puan: 51.0 },
        { name: "Güzelbahçe", puan: 51.0 },
        { name: "Seferihisar", puan: 50.5 },
        { name: "Foça", puan: 50.0 },
        { name: "Kemalpaşa", puan: 50.0 },
        { name: "Dikili", puan: 48.5 },
        { name: "Tire", puan: 48.0 },
        { name: "Selçuk", puan: 47.5 },
        { name: "Bergama", puan: 47.5 },
        { name: "Ödemiş", puan: 47.0 },
        { name: "Karaburun", puan: 47.0 },
        { name: "Bayındır", puan: 47.0 },
        { name: "Kınık", puan: 46.5 },
        { name: "Beydağ", puan: 46.5 },
        { name: "Kiraz", puan: 46.5 }
    ];

    const ctx = document.getElementById("districtChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: districtData.map(d => d.name),
            datasets: [{
                label: "Puan (100 Üzerinden)",
                data: districtData.map(d => d.puan),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});
