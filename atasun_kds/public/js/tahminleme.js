document.addEventListener('DOMContentLoaded', () => {
    const campaignSelect = document.getElementById('campaign');
    const predictionForm = document.getElementById('prediction-form');
    const predictionTableBody = document.querySelector('#prediction-table tbody');

    // Kampanyaları yükleme
    fetch('/api/campaigns')
        .then(response => response.json())
        .then(campaigns => {
            campaigns.forEach(campaign => {
                const option = document.createElement('option');
                option.value = campaign.kampanya_id;
                option.textContent = campaign.kampanya_ad;
                campaignSelect.appendChild(option);
            });
        })
        .catch(err => console.error('Kampanyalar yüklenirken hata:', err));

    // Tahminleme formu gönderimi
    predictionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const campaignId = campaignSelect.value;
        const month = document.getElementById('month').value;

        fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaignId, month })
        })
            .then(response => response.json())
            .then(data => {
                // Tabloyu temizle
                predictionTableBody.innerHTML = '';

                // Tahmin sonucunu tabloya ekle
                const campaignName = campaignSelect.options[campaignSelect.selectedIndex].textContent;
                let row = `
                    <tr>
                        <td>${campaignName}</td>
                        <td>${data.predicted2025.toFixed(2)} ₺</td>
                    </tr>
                `;
                predictionTableBody.innerHTML = row;
            })
            .catch(err => console.error('Tahmin yapılırken hata:', err));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const pastCampaignTableBody = document.querySelector('#past-campaign-table tbody');

    // Geçmiş kampanya verileri
    const pastCampaigns = [
        { campaign_name: "2 Al 1 Öde 2024", total_earnings: 60317452 },
        { campaign_name: "3 Al 2 Öde 2024", total_earnings: 64558036 },
        { campaign_name: "2 Al 1 Öde 2023", total_earnings: 59064553 },
        { campaign_name: "3 Al 2 Öde 2023", total_earnings: 70476134 },
        { campaign_name: "2 Al 1 Öde 2022", total_earnings: 49149051 },
        { campaign_name: "3 Al 2 Öde 2022", total_earnings: 68305273 },
        { campaign_name: "2 Al 1 Öde 2021", total_earnings: 51079924 },
        { campaign_name: "3 Al 2 Öde 2021", total_earnings: 63672655 },
        { campaign_name: "2 Al 1 Öde 2020", total_earnings: 110962801 },
        { campaign_name: "3 Al 2 Öde 2020", total_earnings: 58488478 }
      
         
    ];

    // Tabloyu doldur
    pastCampaigns.forEach(campaign => {
        const row = `
            <tr>
                <td>${campaign.campaign_name}</td>
                <td>${campaign.total_earnings.toLocaleString()} ₺</td>
            </tr>
        `;
        pastCampaignTableBody.innerHTML += row;
    });
});

