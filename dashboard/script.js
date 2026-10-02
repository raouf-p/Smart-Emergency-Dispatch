document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const alertsList = document.getElementById('alertsList');

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      themeBtn.innerHTML = '☀️ الوضع الصباحي';
    } else {
      themeBtn.innerHTML = '🌙 الوضع الليلي';
    }
  });


  const map = L.map('map').setView([36.165, 1.334], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  let markers = {};

  function fetchAlerts() {
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) return;

        alertsList.innerHTML = '';

        data.forEach(alertItem => {
          // إضافة البلاغ للقائمة الجانبية
          const card = document.createElement('div');
          card.className = `alert-card ${alertItem.ai_severity.toLowerCase()}`;
          card.innerHTML = `
            <div class="alert-title">
              <span>🚨 ${alertItem.service}</span>
              <span class="severity-tag ${alertItem.ai_severity}">${alertItem.ai_severity}</span>
            </div>
            <div class="alert-address">📍 ${alertItem.address || 'موقع جغرافي غير معنون'}</div>
            <div class="alert-desc">${alertItem.description || 'بلاغ عاجل مع تحديد GPS'}</div>
          `;

          card.addEventListener('click', () => {
            map.flyTo([alertItem.latitude, alertItem.longitude], 16);
            if (markers[alertItem.id]) {
              markers[alertItem.id].openPopup();
            }
          });

          alertsList.appendChild(card);


          if (!markers[alertItem.id]) {
            const marker = L.marker([alertItem.latitude, alertItem.longitude])
              .addTo(map)
              .bindPopup(`
                <b>${alertItem.service}</b><br>
                درجة الخطورة: ${alertItem.ai_severity}<br>
                ${alertItem.address || ''}
              `);

            markers[alertItem.id] = marker;
          }
        });
      })
      .catch(err => console.error("خطأ في جلب البلاغات:", err));
  }
  fetchAlerts();
  setInterval(fetchAlerts, 3000);
});
let currentSector = '';

const sectorPasswords = {
    civil: 'chlef_civil',
    police: 'chlef_police',
    gendarmerie: 'chlef_gendarmerie',
    hospital: 'chlef_hospital'
};


function openLoginModal(sectorKey, sectorName) {
    currentSector = sectorKey;
    document.getElementById('modalTitle').textContent = `تسجيل دخول: ${sectorName}`;
    document.getElementById('sectorPassword').value = '';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function verifyPassword() {
    const enteredPass = document.getElementById('sectorPassword').value;
    
    if (enteredPass === sectorPasswords[currentSector]) {

        localStorage.setItem('active_sector', currentSector);

        window.location.href = '../dashboard/dashboard.html'; 
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
}
