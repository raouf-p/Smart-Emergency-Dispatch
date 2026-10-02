const translations = {
  ar: {
    pageTitle: "نظام الطوارئ - تقديم بلاغ",
    logoText: "🚨 نظام الطوارئ الذكي",
    navComplaints: "صفحة الشكاوي",
    navTips: "النصائح",
    navAbout: "عنّا",
    mainHeaderTitle: "اختر مصلحة الطوارئ المطلوبة",
    sectorCivil: "الحماية المدنية",
    sectorPolice: "الشرطة",
    sectorGendarmerie: "الدرك الوطني",
    sectorSafety: "السلامة العامة",
    panelTitlePrefix: "الخدمة المحددة: ",
    btnCallText: "📞 اتصل بنا (مكالمة صوتية)",
    btnMsgText: "✉️ إرسال رسالة بلاغ",
    btnStartCallText: "🎙️ بدء الاتصال الصوتي المباشر",
    labelDesc: "وصف حالة الطوارئ:",
    placeholderDesc: "اكتب تفاصيل الحالة هنا...",
    btnSubmitText: "📍 إرسال البلاغ والموقع الآن",
    offlineStatus: "غير متصل حالياً",
    onlineStatus: "🔊 الاتصال الصوتي قائم ومباشر الآن!",
    successMsg: "✅ تم إرسال البلاغ بنجاح إلى ",
    selectSectorAlert: "الرجاء اختيار مصلحة أولاً",
    micError: "تعذر الوصول إلى الميكروفون",
    gpsAlert: "يرجى تفعيل خدمة تحديد الموقع الجغرافي (GPS) لإرسال البلاغ"
  },
  eng: {
    pageTitle: "Emergency System - Report",
    logoText: "🚨 Smart Emergency Dispatch",
    navComplaints: "Complaints",
    navTips: "Tips",
    navAbout: "About",
    mainHeaderTitle: "Select Required Emergency Service",
    sectorCivil: "Civil Protection",
    sectorPolice: "Police",
    sectorGendarmerie: "National Gendarmerie",
    sectorSafety: "Public Safety",
    panelTitlePrefix: "Selected Service: ",
    btnCallText: "📞 Call Us (Voice Call)",
    btnMsgText: "✉️ Send Incident Report",
    btnStartCallText: "🎙 Start Direct Voice Call",
    labelDesc: "Emergency Description:",
    placeholderDesc: "Type details here...",
    btnSubmitText: "📍 Send Report & Location Now",
    offlineStatus: "Offline",
    onlineStatus: "🔊 Direct voice call is live!",
    successMsg: "✅ Report sent successfully to ",
    selectSectorAlert: "Please select a service first",
    micError: "Microphone access denied",
    gpsAlert: "Please enable GPS location services to send the report"
  },
  fra: {
    pageTitle: "Système d'Urgence - Rapport",
    logoText: "🚨 Urgence Intelligente",
    navComplaints: "Plaintes",
    navTips: "Conseils",
    navAbout: "À propos",
    mainHeaderTitle: "Sélectionnez le service d'urgence requis",
    sectorCivil: "Protection Civile",
    sectorPolice: "Police",
    sectorGendarmerie: "Gendarmerie Nationale",
    sectorSafety: "Sécurité Publique",
    panelTitlePrefix: "Service sélectionné : ",
    btnCallText: "📞 Nous appeler (Appel vocal)",
    btnMsgText: "✉️ Envoyer un message d'alerte",
    btnStartCallText: "🎙️ Démarrer l'appel vocal direct",
    labelDesc: "Description de l'urgence :",
    placeholderDesc: "Écrivez les détails ici...",
    btnSubmitText: "📍 Envoyer le rapport et la position",
    offlineStatus: "Déconnecté",
    onlineStatus: "🔊 Appel vocal direct actif !",
    successMsg: "✅ Rapport envoyé avec succès à ",
    selectSectorAlert: "Veuillez d'abord sélectionner un service",
    micError: "Accès au microphone refusé",
    gpsAlert: "Veuillez activer la géolocalisation GPS pour envoyer le rapport"
  }
};

let currentLang = localStorage.getItem('app_lang') || 'ar';
let activeService = "";
let currentServiceNameRaw = "";

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('app_lang');
  if (savedLang) {
    currentLang = savedLang;
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLang;
  }
  applyLanguage(currentLang);

  const savedTheme = localStorage.getItem('app_theme');
  if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.textContent = '☀️️';
  }
});

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  const htmlTag = document.getElementById('htmlTag');
  if (htmlTag) htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = t.pageTitle;

  const logoText = document.getElementById('logoText');
  if (logoText) logoText.textContent = t.logoText;

  const navComplaints = document.getElementById('navComplaints');
  if (navComplaints) navComplaints.textContent = t.navComplaints;

  const navTips = document.getElementById('navTips');
  if (navTips) navTips.textContent = t.navTips;

  const navAbout = document.getElementById('navAbout');
  if (navAbout) navAbout.textContent = t.navAbout;

  const mainHeaderTitle = document.getElementById('mainHeaderTitle');
  if (mainHeaderTitle) mainHeaderTitle.textContent = t.mainHeaderTitle;

  const sectorCivil = document.getElementById('sectorCivil');
  if (sectorCivil) sectorCivil.textContent = t.sectorCivil;

  const sectorPolice = document.getElementById('sectorPolice');
  if (sectorPolice) sectorPolice.textContent = t.sectorPolice;

  const sectorGendarmerie = document.getElementById('sectorGendarmerie');
  if (sectorGendarmerie) sectorGendarmerie.textContent = t.sectorGendarmerie;

  const sectorSafety = document.getElementById('sectorSafety');
  if (sectorSafety) sectorSafety.textContent = t.sectorSafety;

  const btnCallText = document.getElementById('btnCallText');
  if (btnCallText) btnCallText.textContent = t.btnCallText;

  const btnMsgText = document.getElementById('btnMsgText');
  if (btnMsgText) btnMsgText.textContent = t.btnMsgText;

  const btnStartCallText = document.getElementById('btnStartCallText');
  if (btnStartCallText) btnStartCallText.textContent = t.btnStartCallText;

  const labelDesc = document.getElementById('labelDesc');
  if (labelDesc) labelDesc.textContent = t.labelDesc;

  const description = document.getElementById('description');
  if (description) description.placeholder = t.placeholderDesc;

  const btnSubmitText = document.getElementById('btnSubmitText');
  if (btnSubmitText) btnSubmitText.textContent = t.btnSubmitText;

  const callStatus = document.getElementById('callStatus');
  if (callStatus && callStatus.textContent !== t.onlineStatus) {
    callStatus.textContent = t.offlineStatus;
  }

  if (activeService) {
    const sectorKeys = {
      'الحماية المدنية': 'sectorCivil',
      'الشرطة': 'sectorPolice',
      'الدرك الوطني': 'sectorGendarmerie',
      'السلامة العامة': 'sectorSafety'
    };
    const panelTitle = document.getElementById('panelTitle');
    if (panelTitle && sectorKeys[currentServiceNameRaw]) {
      panelTitle.textContent = t.panelTitlePrefix + t[sectorKeys[currentServiceNameRaw]];
    }
  }
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  if (body.getAttribute('data-theme') === 'light') {
    body.removeAttribute('data-theme');
    localStorage.setItem('app_theme', 'dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('app_theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

function selectSector(serviceKey, element) {
  currentServiceNameRaw = serviceKey;
  const sectorKeys = {
    'الحماية المدنية': 'sectorCivil',
    'الشرطة': 'sectorPolice',
    'الدرك الوطني': 'sectorGendarmerie',
    'السلامة العامة': 'sectorSafety'
  };
  activeService = translations[currentLang][sectorKeys[serviceKey]];
  
  document.querySelectorAll('.sector-card').forEach(card => {
    card.classList.remove('active-card');
  });
  element.classList.add('active-card');

  const actionPanel = document.getElementById('actionPanel');
  const panelTitle = document.getElementById('panelTitle');
  
  actionPanel.style.display = 'block';
  panelTitle.textContent = translations[currentLang].panelTitlePrefix + activeService;
  
  document.getElementById('callSection').style.display = 'none';
  document.getElementById('msgSection').style.display = 'none';
}

function showCallSection() {
  document.getElementById('callSection').style.display = 'block';
  document.getElementById('msgSection').style.display = 'none';
}

function showMsgSection() {
  document.getElementById('msgSection').style.display = 'block';
  document.getElementById('callSection').style.display = 'none';
}

let peer = null;
try {
  peer = new Peer();
} catch (e) {}

function startVoiceCall() {
  if (!peer) peer = new Peer();
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const call = peer.call('dispatch_hq_chlef_server', stream);
    call.on('stream', remoteStream => { 
      const remoteAudio = document.getElementById('remoteAudio');
      if (remoteAudio) remoteAudio.srcObject = remoteStream; 
    });
    const callStatus = document.getElementById('callStatus');
    if (callStatus) callStatus.textContent = translations[currentLang].onlineStatus;
  }).catch(err => {
    alert(translations[currentLang].micError);
  });
}

const sosForm = document.getElementById('sosForm');
if (sosForm) {
  sosForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!activeService) {
      alert(translations[currentLang].selectSectorAlert);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(pos => {
      fetch('/api/sos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          latitude: pos.coords.latitude, 
          longitude: pos.coords.longitude, 
          service: currentServiceNameRaw, 
          description: document.getElementById('description').value 
        })
      }).then(res => res.json()).then(data => {
        const statusMsg = document.getElementById('statusMsg');
        if (statusMsg) statusMsg.textContent = translations[currentLang].successMsg + activeService;
      });
    }, err => {
      alert(translations[currentLang].gpsAlert);
    });
  });
}
