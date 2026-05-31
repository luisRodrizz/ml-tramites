import { useEffect, useState } from "react";
import {
  Brain,
  Database,
  GitBranch,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { api } from "../services/api";
import { PageHeader } from "../components/PageHeader";
import { MetricCard } from "../components/MetricCard";
import { EmptyState } from "../components/EmptyState";

const COLORS = ["#1d4ed8", "#0891b2", "#16a34a", "#ca8a04", "#dc2626", "#475569"];

export function ModeloMLPage() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchModelInfo = async () => {
    try {
      const response = await api.get("/modelo/info");
      setModelInfo(response.data);
    } catch {
      toast.error("No se pudo cargar la información del modelo ML.");
    } finally {
      setLoading(false);
    }
  };

  fetchModelInfo();
}, []);

  if (loading) {
    return (
      <div className="space-y-7">
        <PageHeader
          title="Modelo Machine Learning"
          description="Cargando información del modelo..."
        />
        <EmptyState text="Cargando métricas del modelo." />
      </div>
    );
  }

  if (!modelInfo) {
    return (
      <div className="space-y-7">
        <PageHeader
          title="Modelo Machine Learning"
          description="No se pudo obtener la información del modelo."
        />
        <EmptyState text="No hay información disponible del modelo." />
      </div>
    );
  }

  const accuracy = Math.round((modelInfo.accuracy_prioridad || 0) * 100);
  const mae = modelInfo.mae_tiempo || 0;

  return (
    <div className="space-y-7">
      <PageHeader
        title="Modelo Machine Learning"
        description="Métricas, dataset e interpretación del modelo predictivo usado en el sistema."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          title="Registros dataset"
          value={modelInfo.total_registros}
          icon={<Database size={20} />}
        />

        <MetricCard
          title="Entrenamiento"
          value={modelInfo.registros_entrenamiento}
          icon={<Brain size={20} />}
        />

        <MetricCard
          title="Prueba"
          value={modelInfo.registros_prueba}
          icon={<Target size={20} />}
        />

        <MetricCard
          title="Accuracy prioridad"
          value={`${accuracy}%`}
          icon={<TrendingUp size={20} />}
        />

        <MetricCard
          title="MAE tiempo"
          value={`${mae} días`}
          icon={<Timer size={20} />}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
            <Brain size={24} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-950">
            ¿Qué hace el modelo?
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            El sistema utiliza un modelo de clasificación para predecir la
            prioridad del trámite y un modelo de regresión para estimar el
            tiempo aproximado de atención.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">
              Algoritmos usados:
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Clasificación: {modelInfo.modelo_clasificacion}</li>
              <li>• Regresión: {modelInfo.modelo_regresion}</li>
              <li>• Objetivo 1: {modelInfo.objetivo_clasificacion}</li>
              <li>• Objetivo 2: {modelInfo.objetivo_regresion}</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<Database size={20} />}
            title="Datos analizados"
            items={[
              "Tipo de trámite",
              "Área responsable",
              "Nivel de urgencia",
              "Documentos completos",
              "Descripción",
              "Observaciones previas",
              "Reclamos previos",
            ]}
          />

          <InfoCard
            icon={<GitBranch size={20} />}
            title="Proceso ML"
            items={[
              "Lectura del dataset CSV",
              "Preprocesamiento",
              "Entrenamiento",
              "Evaluación",
              "Predicción en FastAPI",
            ]}
          />

          <InfoCard
            icon={<Target size={20} />}
            title="Predicción"
            items={[
              "Prioridad baja",
              "Prioridad media",
              "Prioridad alta",
              "Tiempo estimado",
            ]}
          />

          <InfoCard
            icon={<Timer size={20} />}
            title="Métricas"
            items={[
              `Accuracy prioridad: ${accuracy}%`,
              `Error promedio: ${mae} días`,
              `${modelInfo.registros_prueba} registros de prueba`,
            ]}
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Distribución de prioridad en el dataset">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modelInfo.distribucion_prioridad}
                dataKey="value"
                nameKey="name"
                outerRadius={105}
                label
              >
                {modelInfo.distribucion_prioridad.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución por urgencia">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelInfo.distribucion_urgencia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Importancia de variables">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={modelInfo.importancia_variables} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={180}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />
              <Bar
                dataKey="clasificacion"
                name="Clasificación"
                radius={[0, 8, 8, 0]}
                fill="#1d4ed8"
              />
              <Bar
                dataKey="regresion"
                name="Regresión"
                radius={[0, 8, 8, 0]}
                fill="#0891b2"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-950">
            Interpretación
          </h3>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <p>
              La métrica de accuracy indica qué tan bien clasifica el modelo la
              prioridad del trámite en el conjunto de prueba.
            </p>

            <p>
              El MAE representa el error promedio del modelo al estimar los días
              de atención. Mientras menor sea este valor, mejor es la estimación.
            </p>

            <p>
              La importancia de variables permite identificar qué campos tienen
              mayor influencia en la predicción, por ejemplo la urgencia, el tipo
              de trámite, documentos completos, observaciones o reclamos.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Este módulo demuestra el uso real de Machine Learning dentro del
            prototipo, porque el backend entrena modelos con un dataset CSV y
            expone sus métricas al frontend.
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <h4 className="mt-4 font-semibold text-slate-950">{title}</h4>

      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-5 text-base font-semibold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}