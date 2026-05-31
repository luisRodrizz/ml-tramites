import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  MessageSquareText,
  RefreshCw,
} from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { PriorityBadge } from "../components/PriorityBadge";
import { Progress } from "../components/Progress";

export function DashboardPage({ dashboard, tramites, onRefresh }) {
  const recientes = tramites.slice(0, 5);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Dashboard"
        description="Indicadores generales para evaluar la gestión de trámites municipales."
        action={
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Actualizar
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          title="Total trámites"
          value={dashboard.total_tramites}
          icon={<ClipboardList size={20} />}
        />
        <MetricCard
          title="Prioridad alta"
          value={dashboard.prioridad_alta}
          icon={<AlertTriangle size={20} />}
        />
        <MetricCard
          title="En revisión"
          value={dashboard.en_revision}
          icon={<Eye size={20} />}
        />
        <MetricCard
          title="Observados"
          value={dashboard.observados}
          icon={<AlertTriangle size={20} />}
        />
        <MetricCard
          title="Finalizados"
          value={dashboard.finalizados}
          icon={<CheckCircle2 size={20} />}
        />
        <MetricCard
          title="Satisfacción"
          value={`${dashboard.promedio_satisfaccion || 0}/5`}
          icon={<MessageSquareText size={20} />}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-950">
            Distribución por prioridad
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Clasificación generada por el modelo según los datos del trámite.
          </p>

          <div className="mt-7 space-y-5">
            <Progress
              label="Alta"
              value={dashboard.prioridad_alta}
              total={dashboard.total_tramites}
            />
            <Progress
              label="Media"
              value={dashboard.prioridad_media}
              total={dashboard.total_tramites}
            />
            <Progress
              label="Baja"
              value={dashboard.prioridad_baja}
              total={dashboard.total_tramites}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-950">
            Últimos trámites
          </h3>

          <div className="mt-5 space-y-3">
            {recientes.length === 0 ? (
              <EmptyState text="Todavía no hay trámites registrados." />
            ) : (
              recientes.map((tramite) => (
                <div
                  key={tramite.id}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-950">
                        {tramite.tipo_tramite}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {tramite.ciudadano} · {tramite.area}
                      </p>
                    </div>

                    <PriorityBadge value={tramite.prioridad} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-slate-950">
          Resumen del modelo
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          El sistema utiliza un modelo de Machine Learning para clasificar la
          prioridad de cada trámite y estimar el tiempo de atención. Los datos
          considerados incluyen tipo de trámite, área responsable, urgencia,
          documentos completos y descripción de la solicitud.
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <Clock3 size={18} />
          Tiempo promedio estimado:{" "}
          <strong>{dashboard.promedio_estimado || 0} días</strong>
        </div>
      </div>
    </div>
  );
}