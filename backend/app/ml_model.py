from pathlib import Path

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = BASE_DIR / "data" / "dataset_tramites.csv"

FEATURES = [
    "tipo_tramite",
    "area",
    "urgencia",
    "documentos_completos",
    "descripcion_len",
    "observaciones_previas",
    "reclamos_previos",
]

CATEGORICAL_FEATURES = [
    "tipo_tramite",
    "area",
    "urgencia",
    "documentos_completos",
]

NUMERIC_FEATURES = [
    "descripcion_len",
    "observaciones_previas",
    "reclamos_previos",
]


def load_dataset():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(f"No se encontró el dataset en: {DATASET_PATH}")

    dataset = pd.read_csv(DATASET_PATH)

    required_columns = FEATURES + ["prioridad", "tiempo_estimado"]
    missing_columns = [
        column for column in required_columns if column not in dataset.columns
    ]

    if missing_columns:
        raise ValueError(f"Faltan columnas en el dataset: {missing_columns}")

    dataset["documentos_completos"] = dataset["documentos_completos"].astype(bool)
    dataset["descripcion_len"] = dataset["descripcion_len"].fillna(0).astype(int)
    dataset["observaciones_previas"] = (
        dataset["observaciones_previas"].fillna(0).astype(int)
    )
    dataset["reclamos_previos"] = dataset["reclamos_previos"].fillna(0).astype(int)
    dataset["tiempo_estimado"] = dataset["tiempo_estimado"].fillna(0).astype(int)

    return dataset


dataset = load_dataset()

X = dataset[FEATURES]
y_prioridad = dataset["prioridad"]
y_tiempo = dataset["tiempo_estimado"]

X_train, X_test, y_prioridad_train, y_prioridad_test, y_tiempo_train, y_tiempo_test = (
    train_test_split(
        X,
        y_prioridad,
        y_tiempo,
        test_size=0.25,
        random_state=42,
        stratify=y_prioridad,
    )
)

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_FEATURES),
        ("num", "passthrough", NUMERIC_FEATURES),
    ]
)

priority_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=120,
                random_state=42,
                class_weight="balanced",
            ),
        ),
    ]
)

time_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "regressor",
            RandomForestRegressor(
                n_estimators=120,
                random_state=42,
            ),
        ),
    ]
)

priority_model.fit(X_train, y_prioridad_train)
time_model.fit(X_train, y_tiempo_train)

priority_predictions = priority_model.predict(X_test)
time_predictions = time_model.predict(X_test)

accuracy_prioridad = accuracy_score(y_prioridad_test, priority_predictions)
mae_tiempo = mean_absolute_error(y_tiempo_test, time_predictions)


def predict_tramite(data: dict):
    descripcion = data.get("descripcion", "")

    row = pd.DataFrame(
        [
            {
                "tipo_tramite": data.get("tipo_tramite"),
                "area": data.get("area"),
                "urgencia": data.get("urgencia"),
                "documentos_completos": data.get("documentos_completos", True),
                "descripcion_len": len(descripcion),
                "observaciones_previas": data.get("observaciones_previas", 0),
                "reclamos_previos": data.get("reclamos_previos", 0),
            }
        ]
    )

    prioridad = priority_model.predict(row)[0]
    tiempo = int(round(time_model.predict(row)[0]))

    return {
        "prioridad": prioridad,
        "tiempo_estimado": max(tiempo, 1),
    }


def get_feature_importance():
    classifier = priority_model.named_steps["classifier"]
    regressor = time_model.named_steps["regressor"]

    classifier_importance = classifier.feature_importances_
    regressor_importance = regressor.feature_importances_

    transformed_names = priority_model.named_steps[
        "preprocessor"
    ].get_feature_names_out()

    importance_rows = []

    for name, clf_value, reg_value in zip(
        transformed_names,
        classifier_importance,
        regressor_importance,
    ):
        clean_name = name.replace("cat__", "").replace("num__", "")

        importance_rows.append(
            {
                "name": clean_name,
                "clasificacion": round(float(clf_value), 4),
                "regresion": round(float(reg_value), 4),
            }
        )

    importance_rows.sort(
        key=lambda item: item["clasificacion"] + item["regresion"],
        reverse=True,
    )

    return importance_rows[:10]


def get_distribution(column_name: str):
    values = dataset[column_name].value_counts().to_dict()

    return [
        {
            "name": str(key),
            "value": int(value),
        }
        for key, value in values.items()
    ]


def get_model_info():
    return {
        "dataset_path": str(DATASET_PATH),
        "total_registros": int(len(dataset)),
        "registros_entrenamiento": int(len(X_train)),
        "registros_prueba": int(len(X_test)),
        "features": FEATURES,
        "modelo_clasificacion": "RandomForestClassifier",
        "modelo_regresion": "RandomForestRegressor",
        "objetivo_clasificacion": "prioridad",
        "objetivo_regresion": "tiempo_estimado",
        "accuracy_prioridad": round(float(accuracy_prioridad), 4),
        "mae_tiempo": round(float(mae_tiempo), 2),
        "distribucion_prioridad": get_distribution("prioridad"),
        "distribucion_urgencia": get_distribution("urgencia"),
        "distribucion_area": get_distribution("area"),
        "importancia_variables": get_feature_importance(),
    }