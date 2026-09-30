import os
import requests
from flask import Flask, send_from_directory, request, jsonify, redirect
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# إنشاء تطبيق Flask وتفعيل CORS للربط مع الهواتف والأجهزة الخارجية
app = Flask(__name__, static_folder=None)
CORS(app)

# تحديد المسار الرئيسي للمشروع
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# قاعدة بيانات مؤقتة لتخزين البلاغات الواردة
alerts_db = []

# --- تهيئة نموذج الذكاء الاصطناعي (AI Model) ---
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


# ==========================================
# 0. التوجيه التلقائي للمسار الرئيسي
# ==========================================
@app.route('/')
def root():
    return redirect('/complaints/')


# ==========================================
# 1. مسارات المجلد الأول: الشكاوي (complaints)
# ==========================================
@app.route('/complaints/')
@app.route('/complaints/index.html')
def serve_complaints_index():
    return send_from_directory(os.path.join(BASE_DIR, 'complaints'), 'index.html')

@app.route('/complaints/<path:filename>')
def serve_complaints_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'complaints'), filename)


# ==========================================
# 2. مسارات المجلد الثاني: عنّا (about)
# ==========================================
@app.route('/about/')
@app.route('/about/about.html')
def serve_about_index():
    return send_from_directory(os.path.join(BASE_DIR, 'about'), 'about.html')

@app.route('/about/<path:filename>')
def serve_about_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'about'), filename)


# ==========================================
# 3. مسارات المجلد الثالث: النصائح (tips)
# ==========================================
@app.route('/tips/')
@app.route('/tips/tips.html')
def serve_tips_index():
    return send_from_directory(os.path.join(BASE_DIR, 'tips'), 'tips.html')

@app.route('/tips/<path:filename>')
def serve_tips_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'tips'), filename)


# ==========================================
# 4. مسارات المجلد الرابع: النجدة (dashboard)
# ==========================================
@app.route('/dashboard/')
@app.route('/dashboard/dashboard.html')
def serve_dashboard_index():
    return send_from_directory(os.path.join(BASE_DIR, 'dashboard'), 'dashboard.html')

@app.route('/dashboard/<path:filename>')
def serve_dashboard_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'dashboard'), filename)


# ==========================================
# 5. واجهات برمجة التطبيقات (APIs)
# ==========================================

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    return jsonify(alerts_db)

@app.route('/api/sos', methods=['POST'])
def process_sos():
    data = request.json or {}
    lat = data.get('latitude')
    lon = data.get('longitude')
    service = data.get('service', 'عام')
    description = data.get('description', '')

    if not lat or not lon:
        return jsonify({"status": "error", "message": "الموقع مفقود"}), 400

    ai_risk = ai_model.predict([description])[0] if description.strip() else "MEDIUM"

    address = "موقع جغرافي غير معنون"
    geo_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
    try:
        res = requests.get(geo_url, headers={'User-Agent': 'EmergencyApp/1.0'}, timeout=3).json()
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