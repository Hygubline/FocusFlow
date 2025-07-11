import firebase_admin
from firebase_admin import credentials, firestore
from app.config import settings

firebase_app = None

def init_firebase():
    global firebase_app
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
        firebase_app = firebase_admin.initialize_app(cred, {
            'projectId': settings.FIREBASE_PROJECT_ID,
        })
    return firestore.client()
