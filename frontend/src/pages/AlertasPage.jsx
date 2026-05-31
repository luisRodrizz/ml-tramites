import { Bell } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";

export function AlertasPage({ tramites }) {
  const alertas = tramites
    .filter((tramite) => tramite.estado !== "Registrado")
    .slice()
    .reverse();

  return (
    <div className="space-y-7">
      <PageHeader
        title="Alertas y notificaciones"
        description="Avisos simulados para informar al ciudadano sobre el estado de su solicitud."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {alertas.length === 0 ? (
          <EmptyState text="Aún no hay alertas generadas." />
        ) : (
          <div className="space-y-3">
            {alertas.map((tramite) => (
              <div
                key={tramite.id}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-white p-2 text-blue-700">
                    <Bell size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-950">
                      Trámite #{tramite.id} - {tramite.ciudadano}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Su trámite se encuentra en estado:{" "}
                      <span className="font-semibold">{tramite.estado}</span>.
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Prioridad: {tramite.prioridad} · Tiempo estimado:{" "}
                      {tramite.tiempo_estimado} días
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}