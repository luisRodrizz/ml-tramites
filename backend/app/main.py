from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, SessionLocal, engine
from app.routers import dashboard, feedback, modelo, tramites
from app.seed import seed_data

Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    seed_data(db)
finally:
    db.close()

app = FastAPI(title="Sistema de Trámites Municipales con Machine Learning")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tramites.router)
app.include_router(dashboard.router)
app.include_router(feedback.router)
app.include_router(modelo.router)


@app.get("/")
def home():
    return {
        "message": "API de Trámites Municipales con Machine Learning",
        "status": "ok",
    }