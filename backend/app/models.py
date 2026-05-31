from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Tramite(Base):
    __tablename__ = "tramites"

    id = Column(Integer, primary_key=True, index=True)
    ciudadano = Column(String(150), nullable=False)
    dni = Column(String(8), nullable=False)
    tipo_tramite = Column(String(120), nullable=False)
    area = Column(String(120), nullable=False)
    urgencia = Column(String(20), nullable=False)
    documentos_completos = Column(Boolean, default=True)
    descripcion = Column(Text, nullable=False)

    estado = Column(String(40), default="Registrado")
    prioridad = Column(String(20), nullable=False)
    tiempo_estimado = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    historial = relationship(
        "HistorialEstado",
        back_populates="tramite",
        cascade="all, delete-orphan",
    )

    feedbacks = relationship(
        "Feedback",
        back_populates="tramite",
        cascade="all, delete-orphan",
    )


class HistorialEstado(Base):
    __tablename__ = "historial_estados"

    id = Column(Integer, primary_key=True, index=True)
    tramite_id = Column(Integer, ForeignKey("tramites.id"), nullable=False)
    estado = Column(String(40), nullable=False)
    mensaje = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    tramite = relationship("Tramite", back_populates="historial")


class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    tramite_id = Column(Integer, ForeignKey("tramites.id"), nullable=True)

    ciudadano = Column(String(150), nullable=False)
    calificacion = Column(Integer, nullable=False)
    comentario = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    tramite = relationship("Tramite", back_populates="feedbacks")