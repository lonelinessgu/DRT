from joblib import load as jl_load
import os

MODEL_DIR = os.path.dirname(__file__)
model = jl_load(os.path.join(MODEL_DIR, 'best.pkl'))
vectorizer = jl_load(os.path.join(MODEL_DIR, 'vectorizer.pkl'))