document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const serviceBoxes = document.querySelectorAll('.service-box');
  const smsButtons = document.querySelectorAll('.btn-sms');
  const callButtons = document.querySelectorAll('.btn-call');


  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      themeBtn.innerHTML = '☀️ الوضع الصباحي';
    } else {
      themeBtn.innerHTML = '🌙 الوضع الليلي';
    }
  });


  serviceBoxes.forEach(box => {
    box.addEventListener('click', () => {
      serviceBoxes.forEach(b => {
        if (b !== box) b.classList.remove('active');
      });
      box.classList.toggle('active');
    });
  });


  callButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

 
  smsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceName = btn.getAttribute('data-service');

      if (!navigator.geolocation) {
        alert("متصفحك لا يدعم تحديد الموقع الجغرافي");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            service: serviceName,
            mode: "SMS"
          };

          fetch('/api/sos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(resp => alert(`تم إرسال بلاغ SMS وتحديد موقعك لجهة (${serviceName}) بنجاح!`))
          .catch(err => alert("حدث خطأ أثناء إرسال البلاغ"));
        },
        () => alert("يرجى تفعيل خيار تحديد الموقع الجغرافي (GPS) للإرسال"),
        { enableHighAccuracy: true }
      );
    });
  });
});