from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Feedback, Tramite

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


def format_counter(counter):
    return [{"name": key, "value": value} for key, value in counter.items()]


@router.get("")
def obtener_dashboard(db: Session = Depends(get_db)):
    tramites = db.query(Tramite).all()
    feedbacks = db.query(Feedback).all()

    total = len(tramites)

    prioridad_counter = Counter([t.prioridad for t in tramites])
    estado_counter = Counter([t.estado for t in tramites])
    area_counter = Counter([t.area for t in tramites])

    promedio_estimado = 0
    if total > 0:
        promedio_estimado = round(
            sum(t.tiempo_estimado for t in tramites) / total,
            1,
        )

    promedio_satisfaccion = 0
    if feedbacks:
        promedio_satisfaccion = round(
            sum(f.calificacion for f in feedbacks) / len(feedbacks),
            1,
        )

    return {
        "total_tramites": total,
        "prioridad_alta": prioridad_counter.get("Alta", 0),
        "prioridad_media": prioridad_counter.get("Media", 0),
        "prioridad_baja": prioridad_counter.get("Baja", 0),
        "finalizados": estado_counter.get("Finalizado", 0),
        "en_revision": estado_counter.get("En revisión", 0),
        "observados": estado_counter.get("Observado", 0),
        "promedio_estimado": promedio_estimado,
        "promedio_satisfaccion": promedio_satisfaccion,
        "total_feedbacks": len(feedbacks),
        "por_prioridad": format_counter(prioridad_counter),
        "por_estado": format_counter(estado_counter),
        "por_area": format_counter(area_counter),
    }