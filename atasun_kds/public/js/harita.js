document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map('map').setView([38.4237, 27.1428], 10); // Harita varsayılan konumu (İzmir)

    // Tile layer (harita katmanı)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Manuel olarak tanımlanan şube koordinatları ve satış adetleri
    const branches = [
        { sube_ad: 'İzmir Agora Avm', lat: 38.377774, lon: 27.035654, total_sales: 13247 },
        { sube_ad: 'İzmir Kipa Balçova Avm', lat: 38.384745, lon: 27.0369, total_sales: 13129 },
        { sube_ad: 'İzmir Forum Bornova Avm', lat: 38.462017, lon: 27.225771, total_sales: 13247 },
        { sube_ad: 'İzmir Optimum Gaziemir Avm', lat: 38.327998, lon: 27.13618, total_sales: 13021 },
        { sube_ad: 'İzmir Kıbrıs Şehitleri Cadde', lat: 38.423734, lon: 27.136904, total_sales: 13852 },
        { sube_ad: 'Mavibahçe Avm', lat: 38.458619, lon: 27.109782, total_sales: 13999 },
        { sube_ad: 'Çiğli Kıpa Avm', lat: 38.493053, lon: 27.059449, total_sales: 14250 },
        { sube_ad: 'İzmir İnönü Cadde', lat: 38.38839, lon: 27.1114, total_sales: 13450 },
        { sube_ad: 'Karşıyaka Cadde', lat: 38.462833, lon: 27.090113, total_sales: 13100 },
        { sube_ad: 'Bornova Cadde', lat: 38.455433, lon: 27.224457, total_sales: 13500 },
        { sube_ad: 'Westpark Avm', lat: 38.464569, lon: 27.188849, total_sales: 13350 },
        { sube_ad: 'Ödemiş Cadde', lat: 38.227333, lon: 27.976702, total_sales: 12999 },
        { sube_ad: 'Alaçatı Solaris Cadde', lat: 38.280255, lon: 26.374643, total_sales: 13000 },
        { sube_ad: 'Buca Cadde', lat: 38.387307, lon: 27.150618, total_sales: 12800 },
        { sube_ad: 'İzmir Urla Bamboo Avm', lat: 38.325944, lon: 26.76375, total_sales: 14000 },
        { sube_ad: 'İzmir Optimum Avm Solaris', lat: 38.328398, lon: 27.137505, total_sales: 14500 },
        { sube_ad: 'İzmir Torbalı Cadde', lat: 38.151492, lon: 27.368912, total_sales: 13750 },
        { sube_ad: 'İzmir Karşıyaka Hilltown Avm', lat: 38.468445, lon: 27.10514, total_sales: 14200 },
        { sube_ad: 'İzmir Bostanlı Cadde', lat: 38.4565, lon: 27.09597, total_sales: 13300 },
        { sube_ad: 'İzmir İstinyepark Avm', lat: 38.38817, lon: 27.03551, total_sales: 14100 },
        { sube_ad: 'Aliağa Cadde', lat: 38.799999, lon: 27.091015, total_sales: 13600 },
        { sube_ad: 'İzmir Tire Cadde', lat: 38.094582, lon: 27.732393, total_sales: 12900 },
        { sube_ad: 'İzmir Menemen Cadde', lat: 38.606670, lon: 27.069572, total_sales: 13800 },
        { sube_ad: 'Bergama Cadde', lat: 38.123435, lon: 27.180512, total_sales: 13450 },
        { sube_ad: 'Gaziemir Cadde', lat: 38.323189, lon: 27.124056, total_sales: 13700 },
    ];

    branches.forEach(branch => {
        const { sube_ad, lat, lon, total_sales } = branch;

        let color = '';
        // Satış adetlerine göre renk belirle
        if (total_sales < 13000) {
            color = 'green';
        } else if (total_sales >= 13000 && total_sales < 14000) {
            color = 'blue';
        } else {
            color = 'red';
        }

        // Harita üzerine işaretçi ekle
        L.circle([lat, lon], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: 600
        }).addTo(map).bindPopup(`${sube_ad} - ${total_sales} Satış`);
    });

    // Nüfus yoğunluğunu gösterecek ikinci harita
    const populationMap = L.map('population-map').setView([38.4237, 27.1428], 10); // İzmir'in koordinatları

    // Tile layer (harita katmanı)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(populationMap);

    // Nüfus verileri
    const populationData = {
        "Aliağa": 106000,
        "Balçova": 81000,
        "Bayındır": 40100,
        "Bergama": 107000,
        "Beydağ": 11900,
        "Bornova": 525000,
        "Çeşme": 49500,
        "Çiğli": 216000,
        "Dikili": 54000,
        "Foça": 35500,
        "Gazemir": 139000,
        "Güzelbahçe": 88000,
        "Karaburun": 12500,
        "Karşıyaka": 500000,
        "Kemalpaşa": 125000,
        "Kiraz": 43000,
        "Konak": 720000,
        "Menemen": 125000,
        "Narlıdere": 110000,
        "Seferihisar": 43000,
        "Selçuk": 35500,
        "Torbalı": 50000,
        "Urla": 76000,
        "Bayraklı": 330000,
        "Buca": 525000,
        "Karabağlar": 400000,
        "Menderes": 80000,
        "Tire": 100000,
        "Ödemiş": 120000,
    };

    const getColor = (density) => {
        // Yoğunluk değerlerine göre renk ataması
        return density > 300000 ? 'red' :
               density > 100000  ? 'blue' :
               
                                   'green';
    };

    const districts = [
        { name: 'Aliağa', lat: 38.7996, lon: 26.9707 },
        { name: 'Balçova', lat: 38.3891, lon: 27.0500 },
        { name: 'Bayındır', lat: 38.2178, lon: 27.6478 },
        { name: 'Bergama', lat: 39.1214, lon: 27.1799 },
        { name: 'Beydağ', lat: 38.0847, lon: 28.2106 },
        { name: 'Bornova', lat: 38.4710 , lon: 27.2177 },
        { name: 'Çeşme', lat: 38.3243, lon: 26.3032 },
        { name: 'Çiğli', lat: 38.4940, lon: 26.9617 },
        { name: 'Dikili', lat: 39.0749, lon: 26.8892 },
        { name: 'Foça', lat: 38.6704, lon: 26.7579 },
        { name: 'Gazemir', lat: 38.3253, lon: 27.1219 },
        { name: 'Güzelbahçe', lat: 38.3626, lon: 26.8825 },
        { name: 'Karaburun', lat: 38.6383, lon: 26.5127 },
        { name: 'Karşıyaka', lat: 38.4555, lon: 27.1199 },
        { name: 'Kemalpaşa', lat: 38.4275, lon: 27.4188 },
        { name: 'Kiraz', lat: 38.2302, lon: 28.2064 },
        { name: 'Konak', lat: 38.4177, lon: 27.1283 },
        { name: 'Menemen', lat: 38.6104, lon: 27.0697 },
        { name: 'Narlıdere', lat: 38.3967, lon: 26.9970 },
        { name: 'Seferihisar', lat: 38.1952, lon: 26.8344 },
        { name: 'Selçuk', lat: 37.9508, lon: 27.3700 },
        { name: 'Torbalı', lat: 38.1558, lon: 27.3646 },
        { name: 'Urla', lat: 38.3250, lon: 26.7668 },
        { name: 'Bayraklı', lat: 38.4612, lon: 27.1881 },
        { name: 'Buca', lat: 38.363411, lon: 27.205820 },
        { name: 'Karabağlar', lat: 38.3968, lon: 27.1307 },
        { name: 'Menderes', lat: 38.2517, lon: 27.1327 },
        { name: 'Tire', lat: 38.0895, lon: 27.7318 },
        { name: 'Ödemiş', lat: 38.2283, lon: 27.9748 },
        { name: 'Kınık', lat: 39.0859, lon: 27.3818 },
    ];
    

    districts.forEach(district => {
        const density = populationData[district.name] || 0;
        const color = getColor(density);

        L.circle([district.lat, district.lon], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            radius: 1000
        }).addTo(populationMap).bindPopup(`${district.name}<br> Nüfus: ${populationData[district.name]}<br> Yoğunluk: ${density}`);
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