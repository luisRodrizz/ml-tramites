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
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";

const COLORS = ["#1d4ed8", "#0891b2", "#16a34a", "#ca8a04", "#dc2626", "#475569"];

export function ReportesPage({ dashboard }) {
  const porPrioridad = dashboard.por_prioridad || [];
  const porEstado = dashboard.por_estado || [];
  const porArea = dashboard.por_area || [];

  const empty =
    porPrioridad.length === 0 && porEstado.length === 0 && porArea.length === 0;

  return (
    <div className="space-y-7">
      <PageHeader
        title="Reportes"
        description="Análisis visual para identificar carga de trabajo, prioridades y cuellos de botella."
      />

      {empty ? (
        <EmptyState text="No hay datos suficientes para generar reportes." />
      ) : (
        <>
          <div className="grid gap-5 xl:grid-cols-2">
            <ChartCard title="Trámites por área">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={porArea}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#1d4ed8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Trámites por estado">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={porEstado}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
            <ChartCard title="Distribución por prioridad">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={porPrioridad}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={105}
                    label
                  >
                    {porPrioridad.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-950">
                Interpretación del reporte
              </h3>

              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                <p>
                  Los reportes permiten identificar qué áreas concentran mayor
                  cantidad de trámites, qué estados presentan acumulación y qué
                  solicitudes requieren atención prioritaria.
                </p>
                <p>
                  Esta información ayuda a la municipalidad a detectar cuellos de
                  botella, reasignar recursos y mejorar los tiempos de atención.
                </p>
                <p>
                  El indicador de prioridad permite observar qué porcentaje de
                  trámites requiere atención urgente según el modelo de Machine
                  Learning.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
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