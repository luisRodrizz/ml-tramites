from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class TramiteCreate(BaseModel):
    ciudadano: str
    dni: str = Field(min_length=8, max_length=8)
    tipo_tramite: str
    area: str
    urgencia: str
    documentos_completos: bool = True
    descripcion: str


class TramiteEstadoUpdate(BaseModel):
    estado: str


class HistorialResponse(BaseModel):
    id: int
    estado: str
    mensaje: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class FeedbackCreate(BaseModel):
    tramite_id: Optional[int] = None
    ciudadano: str
    calificacion: int = Field(ge=1, le=5)
    comentario: Optional[str] = None


class FeedbackResponse(BaseModel):
    id: int
    tramite_id: Optional[int]
    ciudadano: str
    calificacion: int
    comentario: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TramiteResponse(BaseModel):
    id: int
    ciudadano: str
    dni: str
    tipo_tramite: str
    area: str
    urgencia: str
    documentos_completos: bool
    descripcion: str
    estado: str
    prioridad: str
    tiempo_estimado: int
    created_at: datetime
    historial: list[HistorialResponse] = []

    model_config = ConfigDict(from_attributes=True)