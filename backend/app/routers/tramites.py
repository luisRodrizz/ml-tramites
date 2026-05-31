from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.ml_model import predict_tramite
from app.models import HistorialEstado, Tramite
from app.schemas import TramiteCreate, TramiteEstadoUpdate, TramiteResponse

router = APIRouter(prefix="/tramites", tags=["Trámites"])


@router.post("", response_model=TramiteResponse)
def crear_tramite(data: TramiteCreate, db: Session = Depends(get_db)):
    prediccion = predict_tramite(data.model_dump())

    tramite = Tramite(
        ciudadano=data.ciudadano,
        dni=data.dni,
        tipo_tramite=data.tipo_tramite,
        area=data.area,
        urgencia=data.urgencia,
        documentos_completos=data.documentos_completos,
        descripcion=data.descripcion,
        estado="Registrado",
        prioridad=prediccion["prioridad"],
        tiempo_estimado=prediccion["tiempo_estimado"],
    )

    db.add(tramite)
    db.commit()
    db.refresh(tramite)

    historial = HistorialEstado(
        tramite_id=tramite.id,
        estado="Registrado",
        mensaje="El trámite fue registrado correctamente.",
    )

    db.add(historial)
    db.commit()

    tramite = (
        db.query(Tramite)
        .options(joinedload(Tramite.historial))
        .filter(Tramite.id == tramite.id)
        .first()
    )

    return tramite


@router.get("", response_model=list[TramiteResponse])
def listar_tramites(
    search: str | None = Query(default=None),
    prioridad: str | None = Query(default=None),
    estado: str | None = Query(default=None),
    area: str | None = Query(default=None),
    tipo_tramite: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Tramite).options(joinedload(Tramite.historial))

    if search:
        search_like = f"%{search}%"
        query = query.filter(
            (Tramite.ciudadano.ilike(search_like))
            | (Tramite.dni.ilike(search_like))
            | (Tramite.tipo_tramite.ilike(search_like))
        )

    if prioridad:
        query = query.filter(Tramite.prioridad == prioridad)

    if estado:
        query = query.filter(Tramite.estado == estado)

    if area:
        query = query.filter(Tramite.area == area)

    if tipo_tramite:
        query = query.filter(Tramite.tipo_tramite == tipo_tramite)

    return query.order_by(Tramite.id.desc()).all()


@router.get("/{tramite_id}", response_model=TramiteResponse)
def obtener_tramite(tramite_id: int, db: Session = Depends(get_db)):
    tramite = (
        db.query(Tramite)
        .options(joinedload(Tramite.historial))
        .filter(Tramite.id == tramite_id)
        .first()
    )

    if not tramite:
        raise HTTPException(status_code=404, detail="Trámite no encontrado")

    return tramite


@router.put("/{tramite_id}/estado", response_model=TramiteResponse)
def actualizar_estado(
    tramite_id: int,
    data: TramiteEstadoUpdate,
    db: Session = Depends(get_db),
):
    tramite = db.query(Tramite).filter(Tramite.id == tramite_id).first()

    if not tramite:
        raise HTTPException(status_code=404, detail="Trámite no encontrado")

    tramite.estado = data.estado

    historial = HistorialEstado(
        tramite_id=tramite.id,
        estado=data.estado,
        mensaje=f"El trámite cambió al estado: {data.estado}.",
    )

    db.add(historial)
    db.commit()

    tramite = (
        db.query(Tramite)
        .options(joinedload(Tramite.historial))
        .filter(Tramite.id == tramite_id)
        .first()
    )

    return tramite