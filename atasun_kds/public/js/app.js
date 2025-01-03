document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ kullanici_adi: username, sifre: password }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Sunucu hatası: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            const messageElement = document.getElementById('responseMessage');
            if (data.message === 'Giriş başarılı.') {
              messageElement.style.color = 'green';
              messageElement.textContent = 'Giriş başarılı! Hoş geldiniz!';
              // Yönlendirme
              window.location.href = '/anasayfa.html';
            } else {
              messageElement.style.color = 'red';
              messageElement.textContent = data.message;
            }
          })
          .catch((error) => {
            console.error('Giriş hatası:', error);
            document.getElementById('responseMessage').textContent = 'Bir hata oluştu.';
          });
      });
    }
  });
  