document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const alertsList = document.getElementById('alertsList');

  // 1. التبديل بين الوضع الصباحي والليلي
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      themeBtn.innerHTML = '☀️ الوضع الصباحي';
    } else {
      themeBtn.innerHTML = '🌙 الوضع الليلي';
    }
  });

  // 2. تهيئة الخريطة التفاعلية Leaflet (التركيز الافتراضي على الجزائر)
  const map = L.map('map').setView([36.165, 1.334], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  let markers = {};

  // 3. دالة جلب البلاغات من السيرفر ورسمها على الخريطة
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

          // عند الضغط على البلاغ في القائمة الجانبية، تنتقل الخريطة إلى موقعه
          card.addEventListener('click', () => {
            map.flyTo([alertItem.latitude, alertItem.longitude], 16);
            if (markers[alertItem.id]) {
              markers[alertItem.id].openPopup();
            }
          });

          alertsList.appendChild(card);

          // إضافة العلامة (Marker) على الخريطة
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

  // جلب البلاغات فور فتح الصفحة وتحديثها كل 3 ثوانٍ
  fetchAlerts();
  setInterval(fetchAlerts, 3000);
});