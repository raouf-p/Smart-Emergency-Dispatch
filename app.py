import os
import random
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
active_sector_otps = {}

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

@app.route('/')
def root():
    return redirect('/complaints/')

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

@app.route('/api/request-sector-otp', methods=['POST'])
def request_sector_otp():
    data = request.json or {}
    sector_key = data.get('sector', '').strip()
    
    if sector_key not in SECTORS:
        return jsonify({"status": "error", "message": "القطاع غير موجود"}), 400

    otp_code = str(random.randint(100000, 999999))
    active_sector_otps[sector_key] = otp_code
    
    return jsonify({
        "status": "success",
        "code": otp_code,
        "message": "تم التوليد"
    }), 200

@app.route('/api/verify-sector-otp', methods=['POST'])
def verify_sector_otp():
    data = request.json or {}
    sector_key = data.get('sector', '').strip()
    user_code = data.get('code', '').strip()

    if sector_key in active_sector_otps and active_sector_otps[sector_key] == user_code:
        del active_sector_otps[sector_key]
        sector_info = SECTORS[sector_key]
        return jsonify({
            "status": "success",
            "verified": True,
            "role": sector_info['role'],
            "name": sector_info['name']
        }), 200
    
    return jsonify({"status": "error", "message": "رمز خطأ"}), 401

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    user_role = request.args.get('role', 'الكل')
    
    if user_role == 'الكل':
        return jsonify(alerts_db)
    
    filtered_alerts = [
        alert for alert in alerts_db 
        if alert['service'] == user_role or alert['service'] == 'طوارئ عامة'
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
    
    address = "موقع غير معنون"
    try:
        res = requests.get(
            f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json", 
            headers={'User-Agent': 'EmergencyApp/1.0'}, 
            timeout=3
        ).json()
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
        msg = {
            "sender": data.get("sender", "مواطن"), 
            "text": data.get("text", "")
        }
        chat_messages.append(msg)
        return jsonify({"status": "success", "messages": chat_messages})
    return jsonify(chat_messages)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
