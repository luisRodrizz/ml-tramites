from fastapi import APIRouter

from app.ml_model import get_model_info

router = APIRouter(prefix="/modelo", tags=["Modelo ML"])


@router.get("/info")
def obtener_info_modelo():
    return get_model_info()