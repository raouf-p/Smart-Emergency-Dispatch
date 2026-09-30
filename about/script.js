document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // 1. التبديل بين الوضع الصباحي والليلي
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      themeBtn.innerHTML = '☀️ الوضع الصباحي';
    } else {
      themeBtn.innerHTML = '🌙 الوضع الليلي';
    }
  });

  // 2. التبديل بين التبويبات الأربعة (الحماية، الشرطة، الدرك، المنصة)
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // إزالة الحالة النشطة من جميع الأزرار والمحتويات
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // تفعيل الزر والمحتوى المختار
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
});