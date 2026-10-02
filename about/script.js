const translations = {
  ar: {
    pageTitle: "نظام الطوارئ - التعريف بالمؤسسات",
    logoText: "🚨 نظام الطوارئ الذكي",
    navComplaints: "صفحة الشكاوي",
    navTips: "النصائح",
    navAbout: "عنّا",
    mainTitle: "التعريف بالمؤسسات ومنصة النجدة",
    mainSubtitle: "تعرف على تاريخ، مهام، ونشأة الهيئات القائمة على أمنك وسلامتك",
    btnProtection: "🚒 الحماية المدنية",
    btnPolice: "🚓 الشرطة",
    btnGendarmerie: "🛡️ الدرك الوطني",
    btnPlatform: "💻 منصة النجدة الذكية",
    
    protTitle: "سلاح الحماية المدنية",
    protYear: "عام التأسيس: 1964",
    protHistoryTitle: "النشأة والتاريخ:",
    protHistoryText: "تأسست الحماية المدنية لتكون الجهاز الوطني الأول المكلف بإدارة الكوارث وإسعاف المواطنين. تطورت على مر العقود لتصبح هئية حديثة تعتمد على وسائل إنقاذ متطورة وفرق غوص وتدخل سريع.",
    protTasksTitle: "المهام الرئيسية:",
    protTask1: "إخلاء وإسعاف ضحايا حوادث المرور والحوادث المنزلية.",
    protTask2: "مكافحة وإخماد حرائق الغابات والمصانع والبنايات.",
    protTask3: "الإنقاذ أثناء الكوارث الطبيعية مثل الفيضانات والزلزال.",
    protTask4: "تأمين المهرجانات والمجمعات الكبرى والوقاية من أخطار الغاز.",

    policeTitle: "الأمن الوطني (الشرطة)",
    policeYear: "عام التأسيس: 1962",
    policeHistoryTitle: "النشأة والتاريخ:",
    policeHistoryText: "تأسست الشرطة الوطنية فور الاستقلال لحفظ النظام العام في الوسط الحضري والمدن. وتضم اليوم وحدات متخصصة كشرطة العمران، مكافحة الجريمة الإلكترونية، وفرق البحث والتدخل.",
    policeTasksTitle: "المهام الرئيسية:",
    policeTask1: "حماية المواطنين والممتلكات العامة والخاصة داخل المدن.",
    policeTask2: "مكافحة الجريمة المنظمة، السرقة، والابتزاز الرقمي.",
    policeTask3: "تنظيم حركة المرور وتسهيل التنقل داخل المناطق الحضرية.",
    policeTask4: "استقبال بلاغات المواطنين والتدخل الفوري عند أي اعتداء.",

    gendarmerieTitle: "مؤسسة الدرك الوطني",
    gendarmerieYear: "عام التأسيس: 1962",
    gendarmerieHistoryTitle: "النشأة والتاريخ:",
    gendarmerieHistoryText: "قوة عمومية ذات طابع عسكري تعمل تحت وصاية وزارة الدفاع الوطني. تغطي نفوذ البلدية والأقاليم الريفية والطرقات الكبرى لتأمين حدوده وأمن المواطن الساكن خارج أطراف المدن.",
    gendarmerieTasksTitle: "المهام الرئيسية:",
    gendarmerieTask1: "أمن وحراسة الطرقات الوطنية والسريعة وتأمين تنقلات المواطنين.",
    gendarmerieTask2: "مكافحة الجريمة في المناطق شبه الحضرية والريفية.",
    gendarmerieTask3: "التحريات الجنائية المعقدة بفضل المخابر العلمية للدرك.",
    gendarmerieTask4: "المشاركة في حماية الحدود وإدارة أزمات الطوارئ الكبرى."
  },
  eng: {
    pageTitle: "Emergency System - Institutions",
    logoText: "🚨 Smart Emergency Dispatch",
    navComplaints: "Complaints",
    navTips: "Tips",
    navAbout: "About",
    mainTitle: "Introduction to Institutions & Rescue Platform",
    mainSubtitle: "Learn about the history, missions, and establishment of agencies ensuring your security and safety",
    btnProtection: "🚒 Civil Protection",
    btnPolice: "🚓 Police",
    btnGendarmerie: "🛡️ National Gendarmerie",
    btnPlatform: "💻 Smart Rescue Platform",
    
    protTitle: "Civil Protection",
    protYear: "Establishment Year: 1964",
    protHistoryTitle: "History & Establishment:",
    protHistoryText: "Civil Protection was established as the primary national agency tasked with disaster management and citizen rescue. It has evolved over the decades into a modern body relying on advanced rescue tools, diving teams, and rapid intervention.",
    protTasksTitle: "Main Missions:",
    protTask1: "Evacuating and rescuing victims of traffic and household accidents.",
    protTask2: "Combating and extinguishing forest, factory, and building fires.",
    protTask3: "Rescue during natural disasters such as floods and earthquakes.",
    protTask4: "Securing festivals, major complexes, and gas hazard prevention.",

    policeTitle: "National Security (Police)",
    policeYear: "Establishment Year: 1962",
    policeHistoryTitle: "History & Establishment:",
    policeHistoryText: "The National Police was established immediately after independence to maintain public order in urban areas. Today, it includes specialized units such as urban police, cybercrime combat, and search and intervention teams.",
    policeTasksTitle: "Main Missions:",
    policeTask1: "Protecting citizens and public and private property within cities.",
    policeTask2: "Combating organized crime, theft, and digital extortion.",
    policeTask3: "Regulating traffic and facilitating mobility in urban areas.",
    policeTask4: "Receiving citizen reports and immediate intervention during any assault.",

    gendarmerieTitle: "National Gendarmerie",
    gendarmerieYear: "Establishment Year: 1962",
    gendarmerieHistoryTitle: "History & Establishment:",
    gendarmerieHistoryText: "A public force with a military character operating under the auspices of the Ministry of National Defense. It covers municipal jurisdictions, rural regions, and major roads to secure borders and citizens living outside city limits.",
    gendarmerieTasksTitle: "Main Missions:",
    gendarmerieTask1: "Securing and guarding national and highways and ensuring citizen mobility.",
    gendarmerieTask2: "Combating crime in semi-urban and rural areas.",
    gendarmerieTask3: "Complex criminal investigations thanks to the scientific laboratories of the gendarmerie.",
    gendarmerieTask4: "Participating in border protection and managing major emergency crises."
  },
  fra: {
    pageTitle: "Système d'Urgence - Institutions",
    logoText: "🚨 Urgence Intelligente",
    navComplaints: "Plaintes",
    navTips: "Conseils",
    navAbout: "À propos",
    mainTitle: "Présentation des Institutions et de la Plateforme de Secours",
    mainSubtitle: "Découvrez l'histoire, les missions et la création des agences qui garantissent votre sécurité",
    btnProtection: "🚒 Protection Civile",
    btnPolice: "🚓 Police",
    btnGendarmerie: "🛡️ Gendarmerie Nationale",
    btnPlatform: "💻 Plateforme de Secours Intelligente",
    
    protTitle: "Protection Civile",
    protYear: "Année de création : 1964",
    protHistoryTitle: "Historique et Origine :",
    protHistoryText: "La Protection Civile a été créée pour être le premier organisme national chargé de la gestion des catastrophes et du secours aux citoyens. Elle a évolué au fil des décennies pour devenir un corps moderne doté de moyens de sauvetage avancés.",
    protTasksTitle: "Missions Principales :",
    protTask1: "Évacuation et secours des victimes d'accidents de la route et domestiques.",
    protTask2: "Lutte et extinction des feux de forêts, d'usines et de bâtiments.",
    protTask3: "Sauvetage lors de catastrophes naturelles telles que les inondations et séismes.",
    protTask4: "Sécurisation des festivals, grands complexes et prévention des risques gaziers.",

    policeTitle: "Sûreté Nationale (Police)",
    policeYear: "Année de création : 1962",
    policeHistoryTitle: "Historique et Origine :",
    policeHistoryText: "La Sûreté Nationale a été créée immédiatement après l'indépendance pour maintenir l'ordre public en milieu urbain. Elle comprend aujourd'hui des unités spécialisées telles que la police urbaine, la lutte contre la cybercriminalité et les équipes d'intervention.",
    policeTasksTitle: "Missions Principales :",
    policeTask1: "Protéger les citoyens et les biens publics et privés dans les villes.",
    policeTask2: "Lutter contre le crime organisé, le vol et l'extorsion numérique.",
    policeTask3: "Réguler la circulation et faciliter la mobilité dans les zones urbaines.",
    policeTask4: "Recevoir les signalements des citoyens et intervenir immédiatement en cas d'agression.",

    gendarmerieTitle: "Gendarmerie Nationale",
    gendarmerieYear: "Année de création : 1962",
    gendarmerieHistoryTitle: "Historique et Origine :",
    gendarmerieHistoryText: "Force publique à caractère militaire placée sous la tutelle du Ministère de la Défense Nationale. Elle couvre les zones rurales et les grands axes routiers pour assurer la sécurité des citoyens.",
    gendarmerieTasksTitle: "Missions Principales :",
    gendarmerieTask1: "Sécurisation et surveillance des routes nationales et autoroutes.",
    gendarmerieTask2: "Lutte contre la criminalité dans les zones semi-urbaines et rurales.",
    gendarmerieTask3: "Enquêtes criminelles complexes grâce aux laboratoires scientifiques.",
    gendarmerieTask4: "Participation à la protection des frontières et gestion des crises majeures."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('app_lang') || 'ar';
  const savedTheme = localStorage.getItem('app_theme');
  const themeToggle = document.getElementById('themeToggle');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = savedLang;
  applyLanguage(savedLang);

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-tab');

      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });

      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
      }
    });
  });

  tabContents.forEach(content => {
    if (!content.classList.contains('active')) {
      content.style.display = 'none';
    }
  });
});

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    localStorage.setItem('app_theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('app_theme', 'dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

function changeLanguage(lang) {
  localStorage.setItem('app_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  const htmlTag = document.getElementById('htmlTag');
  if (htmlTag) htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const logoText = document.getElementById('logoText');
  if (logoText) logoText.textContent = t.logoText;

  const navComplaints = document.getElementById('navComplaints');
  if (navComplaints) navComplaints.textContent = t.navComplaints;

  const navTips = document.getElementById('navTips');
  if (navTips) navTips.textContent = t.navTips;

  const navAbout = document.getElementById('navAbout');
  if (navAbout) navAbout.textContent = t.navAbout;

  const mainTitle = document.querySelector('.page-title, h1');
  if (mainTitle && mainTitle.id !== 'pageTitle') mainTitle.textContent = t.mainTitle;

  const mainSubtitle = document.querySelector('.page-subtitle, p');
  if (mainSubtitle && !mainSubtitle.id && !mainSubtitle.closest('.about-card')) mainSubtitle.textContent = t.mainSubtitle;

  const btnProtection = document.querySelector('[data-tab="protection"]');
  if (btnProtection) btnProtection.textContent = t.btnProtection;

  const btnPolice = document.querySelector('[data-tab="police"]');
  if (btnPolice) btnPolice.textContent = t.btnPolice;

  const btnGendarmerie = document.querySelector('[data-tab="gendarmerie"]');
  if (btnGendarmerie) btnGendarmerie.textContent = t.btnGendarmerie;

  const btnPlatform = document.querySelector('[data-tab="platform"]');
  if (btnPlatform) btnPlatform.textContent = t.btnPlatform;

  const protTitleEl = document.querySelector('#protection h2');
  if (protTitleEl) protTitleEl.textContent = t.protTitle;
  const protYearEl = document.querySelector('#protection .badge');
  if (protYearEl) protYearEl.textContent = t.protYear;
  const protHeadings = document.querySelectorAll('#protection .card-body h3');
  if (protHeadings.length >= 2) {
    protHeadings[0].textContent = t.protHistoryTitle;
    protHeadings[1].textContent = t.protTasksTitle;
  }
  const protTextEl = document.querySelector('#protection .card-body p');
  if (protTextEl) protTextEl.textContent = t.protHistoryText;
  const protTasksList = document.querySelectorAll('#protection .card-body ul li');
  if (protTasksList.length >= 4) {
    protTasksList[0].textContent = t.protTask1;
    protTasksList[1].textContent = t.protTask2;
    protTasksList[2].textContent = t.protTask3;
    protTasksList[3].textContent = t.protTask4;
  }

  const policeTitleEl = document.querySelector('#police h2');
  if (policeTitleEl) policeTitleEl.textContent = t.policeTitle;
  const policeYearEl = document.querySelector('#police .badge');
  if (policeYearEl) policeYearEl.textContent = t.policeYear;
  const policeHeadings = document.querySelectorAll('#police .card-body h3');
  if (policeHeadings.length >= 2) {
    policeHeadings[0].textContent = t.policeHistoryTitle;
    policeHeadings[1].textContent = t.policeTasksTitle;
  }
  const policeTextEl = document.querySelector('#police .card-body p');
  if (policeTextEl) policeTextEl.textContent = t.policeHistoryText;
  const policeTasksList = document.querySelectorAll('#police .card-body ul li');
  if (policeTasksList.length >= 4) {
    policeTasksList[0].textContent = t.policeTask1;
    policeTasksList[1].textContent = t.policeTask2;
    policeTasksList[2].textContent = t.policeTask3;
    policeTasksList[3].textContent = t.policeTask4;
  }

  const gendarmerieTitleEl = document.querySelector('#gendarmerie h2');
  if (gendarmerieTitleEl) gendarmerieTitleEl.textContent = t.gendarmerieTitle;
  const gendarmerieYearEl = document.querySelector('#gendarmerie .badge');
  if (gendarmerieYearEl) gendarmerieYearEl.textContent = t.gendarmerieYear;
  const gendarmerieHeadings = document.querySelectorAll('#gendarmerie .card-body h3');
  if (gendarmerieHeadings.length >= 2) {
    gendarmerieHeadings[0].textContent = t.gendarmerieHistoryTitle;
    gendarmerieHeadings[1].textContent = t.gendarmerieTasksTitle;
  }
  const gendarmerieTextEl = document.querySelector('#gendarmerie .card-body p');
  if (gendarmerieTextEl) gendarmerieTextEl.textContent = t.gendarmerieHistoryText;
  const gendarmerieTasksList = document.querySelectorAll('#gendarmerie .card-body ul li');
  if (gendarmerieTasksList.length >= 4) {
    gendarmerieTasksList[0].textContent = t.gendarmerieTask1;
    gendarmerieTasksList[1].textContent = t.gendarmerieTask2;
    gendarmerieTasksList[2].textContent = t.gendarmerieTask3;
    gendarmerieTasksList[3].textContent = t.gendarmerieTask4;
  }
}
