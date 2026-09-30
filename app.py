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

# --- إعدادات بريد النجدة الرسمي ---
EMERGENCY_GMAIL = "your-emergency-email@gmail.com"  # استبدله ببريد النجدة الرسمي
GMAIL_APP_PASSWORD = "xxxx xxxx xxxx xxxx"         # كلمة سر التطبيقات من Google
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

def send_otp_email(target_email, code):
    try:
        msg = MIMEText(f"رمز الدخول المصرح لغرفة عمليات النجدة هو: {code}\nلا تشارك هذا الرمز مع أي شخص.")
        msg['Subject'] = '🚨 رمز أمان دخول غرفة العمليات - نظام النجدة'
        msg['From'] = EMERGENCY_GMAIL
        msg['To'] = target_email

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(EMERGENCY_GMAIL, GMAIL_APP_PASSWORD)
        server.sendmail(EMERGENCY_GMAIL, [target_email], msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print("خطأ الإرسال:", e)
        return False

@app.route('/')
def root():
    return redirect('/complaints/')

# --- مسارات المجلدات الأربعة ---
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

# --- APIs الحماية والـ OTP ---
@app.route('/api/request-otp', methods=['POST'])
def request_otp():
    otp_code = str(random.randint(100000, 999999))
    active_otps['admin'] = otp_code
    sent = send_otp_email(EMERGENCY_GMAIL, otp_code)
    if sent:
        return jsonify({"status": "success", "message": "تم إرسال كود التحقق إلى ايميل النجدة الرسمي"}), 200
    else:
        return jsonify({"status": "warning", "message": "كود التجربة المحلي هو: " + otp_code}), 200

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json or {}
    user_code = data.get('code', '').strip()
    if active_otps.get('admin') and user_code == active_otps.get('admin'):
        return jsonify({"status": "success", "verified": True}), 200
    else:
        return jsonify({"status": "error", "message": "رمز التحقق غير صحيح!"}), 401

# --- APIs البلاغات ---
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    return jsonify(alerts_db)

@app.route('/api/sos', methods=['POST'])
def process_sos():
    data = request.json or {}
    lat, lon = data.get('latitude'), data.get('longitude')
    service = data.get('service', 'عام')
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
