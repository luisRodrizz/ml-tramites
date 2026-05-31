from app.ml_model import predict_tramite
from app.models import HistorialEstado, Tramite


SEED_TRAMITES = [
    {
        "ciudadano": "Carlos Ramírez Torres",
        "dni": "45678912",
        "tipo_tramite": "Licencia de funcionamiento",
        "area": "Licencias",
        "urgencia": "Alta",
        "documentos_completos": True,
        "descripcion": "Solicitud para apertura de local comercial.",
        "estado": "En revisión",
    },
    {
        "ciudadano": "María Quispe Flores",
        "dni": "70581243",
        "tipo_tramite": "Permiso de construcción",
        "area": "Desarrollo urbano",
        "urgencia": "Alta",
        "documentos_completos": False,
        "descripcion": "Permiso para ampliación de vivienda familiar.",
        "estado": "Observado",
    },
    {
        "ciudadano": "Jorge Huamán Soto",
        "dni": "62457891",
        "tipo_tramite": "Constancia municipal",
        "area": "Mesa de partes",
        "urgencia": "Baja",
        "documentos_completos": True,
        "descripcion": "Solicitud de constancia domiciliaria.",
        "estado": "Finalizado",
    },
    {
        "ciudadano": "Lucía Fernández Rojas",
        "dni": "47859621",
        "tipo_tramite": "Reclamo ciudadano",
        "area": "Atención ciudadana",
        "urgencia": "Alta",
        "documentos_completos": True,
        "descripcion": "Reclamo por demora en atención de expediente previo.",
        "estado": "Registrado",
    },
    {
        "ciudadano": "Pedro Salazar León",
        "dni": "73569124",
        "tipo_tramite": "Trámite de catastro",
        "area": "Catastro",
        "urgencia": "Media",
        "documentos_completos": False,
        "descripcion": "Actualización de datos catastrales del predio.",
        "estado": "En revisión",
    },
    {
        "ciudadano": "Rosa Delgado Paredes",
        "dni": "69857412",
        "tipo_tramite": "Solicitud de acceso a información",
        "area": "Secretaría general",
        "urgencia": "Media",
        "documentos_completos": True,
        "descripcion": "Solicitud de copia de documentos administrativos.",
        "estado": "Aprobado",
    },
]


def seed_data(db):
    existe_data = db.query(Tramite).first()

    if existe_data:
        return

    for item in SEED_TRAMITES:
        prediccion = predict_tramite(item)

        tramite = Tramite(
            ciudadano=item["ciudadano"],
            dni=item["dni"],
            tipo_tramite=item["tipo_tramite"],
            area=item["area"],
            urgencia=item["urgencia"],
            documentos_completos=item["documentos_completos"],
            descripcion=item["descripcion"],
            estado=item["estado"],
            prioridad=prediccion["prioridad"],
            tiempo_estimado=prediccion["tiempo_estimado"],
        )

        db.add(tramite)
        db.commit()
        db.refresh(tramite)

        historial_registro = HistorialEstado(
            tramite_id=tramite.id,
            estado="Registrado",
            mensaje="El trámite fue registrado correctamente.",
        )

        db.add(historial_registro)

        if item["estado"] != "Registrado":
            historial_estado = HistorialEstado(
                tramite_id=tramite.id,
                estado=item["estado"],
                mensaje=f"El trámite cambió al estado: {item['estado']}.",
            )

            db.add(historial_estado)

        db.commit()