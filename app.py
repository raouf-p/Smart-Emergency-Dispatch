import os
import random
import smtplib
from email.mime.text import MIMEText
import requests
from flask import Flask, send_from_directory, request, jsonify, redirect
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

app = Flask(__name__, static_folder=None)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
alerts_db = []
chat_messages = []

# --- إعدادات البريد الحقيقي لإرسال واستقبال أرقام الـ OTP ---
TARGET_GMAIL = "raouftgr7@gmail.com"           # البريد الحقيقي الذي يصلك عليه الكود
SENDER_GMAIL = "raouftgr7@gmail.com"           # البريد المرسل
GMAIL_APP_PASSWORD = "xxxx xxxx xxxx xxxx"     # كلمة سر التطبيقات من إعدادات أمان Google

# --- القطاعات المتاحة ---
SECTORS = {
    "civil_protection": {
        "role": "الحماية المدنية",
        "name": "مديرية الحماية المدنية - ولاية الشلف"
    },
    "police": {
        "role": "الشرطة",
        "name": "الأمن الولائي - الشلف"
    },
    "gendarmerie": {
        "role": "الدرك الوطني",
        "name": "المجموعة الإقليمية للدرك الوطني"
    },
    "admin": {
        "role": "الكل",
        "name": "مركز التحكم والعمليات المشتركة"
    }
}

active_otps = {}

# --- نموذج الذكاء الاصطناعي لتقييم الخطورة ---
training_data = [
    ("حريق كبير انفجار جثث فاقد للوعي نزيف حاد اختناق غرق", "CRITICAL"),
    ("Feu grave, explosion, perte de connaissance, accident", "CRITICAL"),
    ("Fire, explosion, unconscious, severe bleeding", "CRITICAL"),
    ("كسر قدم حادث سير بسيط سرقة هاتف مشاجرة سقوط", "MEDIUM"),
    ("Fracture, accident mineur, vol, bagarre", "MEDIUM"),
    ("Broken bone, minor accident, phone theft", "MEDIUM"),
    ("استفسار ضياع محفظة قطة علقت إزعاج تسرب ماء", "LOW"),
    ("Perte de portefeuille, bruit, fuite d'eau", "LOW")
]
texts, labels = zip(*training_data)
ai_model = make_pipeline(TfidfVectorizer(), MultinomialNB())
ai_model.fit(texts, labels)

def send_otp_to_user_email(code, sector_name):
    try:
        msg = MIMEText(f"🚨 رمز أمان دخول غرفة عمليات ({sector_name}) هو:\n\n{code}\n\nهذا الرمز متغير وصالح لهذه الجلسة فقط.")
        msg['Subject'] = f'🔐 رمز التحقق لغرفة العمليات - {sector_name}'
        msg['From'] = SENDER_GMAIL
        msg['To'] = TARGET_GMAIL

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(SENDER_GMAIL, GMAIL_APP_PASSWORD)
        server.sendmail(SENDER_GMAIL, [TARGET_GMAIL], msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print("خطأ الإرسال البريدي:", e)
        return False

@app.route('/')
def root():
    return redirect('/complaints/')

# --- تقديم ملفات الواجهات ---
@app.route('/complaints/')
@app.route('/complaints/index.html')
def serve_complaints_index():
    return send_from_directory(os.path.join(BASE_DIR, 'complaints'), 'index.html')

@app.route('/complaints/<path:filename>')
def serve_complaints_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'complaints'), filename)

@app.route('/about/')
@app.route('/about/about.html')
def serve_about_index():
    return send_from_directory(os.path.join(BASE_DIR, 'about'), 'about.html')

@app.route('/about/<path:filename>')
def serve_about_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'about'), filename)

@app.route('/tips/')
@app.route('/tips/tips.html')
def serve_tips_index():
    return send_from_directory(os.path.join(BASE_DIR, 'tips'), 'tips.html')

@app.route('/tips/<path:filename>')
def serve_tips_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'tips'), filename)

@app.route('/dashboard/')
@app.route('/dashboard/dashboard.html')
def serve_dashboard_index():
    return send_from_directory(os.path.join(BASE_DIR, 'dashboard'), 'dashboard.html')

@app.route('/dashboard/<path:filename>')
def serve_dashboard_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'dashboard'), filename)

# --- APIs الـ OTP المتغير ---
@app.route('/api/request-sector-otp', methods=['POST'])
def request_sector_otp():
    data = request.json or {}
    sector_key = data.get('sector', '').strip()

    if sector_key not in SECTORS:
        return jsonify({"status": "error", "message": "القطاع المحدد غير موجود!"}), 400

    sector_info = SECTORS[sector_key]
    otp_code = str(random.randint(100000, 999999))
    active_otps[sector_key] = otp_code

    sent = send_otp_to_user_email(otp_code, sector_info['name'])

    if sent:
        return jsonify({
            "status": "success",
            "message": f"تم إرسال كود التحقق المتغير إلى إيميلك (raouftgr7@gmail.com) بنجاح."
        }), 200
    else:
        # كود طوارئ يظهر بالشاشة في حالة لم تدخلApp Password الخاص بجوجل بعد
        return jsonify({
            "status": "warning",
            "message": f"الرمز المتغير للقطاع هو: {otp_code} (تفقد الإيميل أو استخدم الرمز الظاهر)"
        }), 200

@app.route('/api/verify-sector-otp', methods=['POST'])
def verify_sector_otp():
    data = request.json or {}
    sector_key = data.get('sector', '').strip()
    user_code = data.get('code', '').strip()

    if sector_key in active_otps and active_otps[sector_key] == user_code:
        del active_otps[sector_key]
        sector_info = SECTORS[sector_key]
        return jsonify({
            "status": "success",
            "verified": True,
            "role": sector_info['role'],
            "name": sector_info['name']
        }), 200
    else:
        return jsonify({"status": "error", "message": "رمز التحقق غير صحيح أو انتهت صلاحيته!"}), 401

# --- APIs البلاغات والدردشة ---
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    user_role = request.args.get('role', 'الكل')
    if user_role == 'الكل':
        return jsonify(alerts_db)
    
    filtered_alerts = [
        a for a in alerts_db 
        if a['service'] == user_role or a['service'] == 'طوارئ عامة'
    ]
    return jsonify(filtered_alerts)

@app.route('/api/sos', methods=['POST'])
def process_sos():
    data = request.json or {}
    lat, lon = data.get('latitude'), data.get('longitude')
    service = data.get('service', 'طوارئ عامة')
    description = data.get('description', '')

    if not lat or not lon:
        return jsonify({"status": "error", "message": "الموقع مفقود"}), 400

    ai_risk = ai_model.predict([description])[0] if description.strip() else "MEDIUM"
    address = "موقع جغرافي غير معنون"
    try:
        res = requests.get(f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json", headers={'User-Agent': 'EmergencyApp/1.0'}, timeout=3).json()
        address = res.get('display_name', address)
    except Exception:
        pass

    alert_item = {
        "id": len(alerts_db) + 1,
        "service": service,
        "address": address,
        "latitude": lat,
        "longitude": lon,
        "ai_severity": ai_risk,
        "description": description
    }
    alerts_db.append(alert_item)
    return jsonify({"status": "success", "result": alert_item}), 200

@app.route('/api/chat', methods=['GET', 'POST'])
def handle_chat():
    if request.method == 'POST':
        data = request.json or {}
        msg = {"sender": data.get("sender", "مواطن"), "text": data.get("text", "")}
        chat_messages.append(msg)
        return jsonify({"status": "success", "messages": chat_messages})
    return jsonify(chat_messages)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
