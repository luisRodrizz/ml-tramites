from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Feedback, Tramite
from app.schemas import FeedbackCreate, FeedbackResponse

router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.post("", response_model=FeedbackResponse)
def crear_feedback(data: FeedbackCreate, db: Session = Depends(get_db)):
    if data.tramite_id:
        tramite = db.query(Tramite).filter(Tramite.id == data.tramite_id).first()

        if not tramite:
            raise HTTPException(status_code=404, detail="Trámite no encontrado")

    feedback = Feedback(
        tramite_id=data.tramite_id,
        ciudadano=data.ciudadano,
        calificacion=data.calificacion,
        comentario=data.comentario,
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback


@router.get("", response_model=list[FeedbackResponse])
def listar_feedbacks(db: Session = Depends(get_db)):
    return db.query(Feedback).order_by(Feedback.id.desc()).all()