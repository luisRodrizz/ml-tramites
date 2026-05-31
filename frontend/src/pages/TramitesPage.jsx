import { Eye, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { PriorityBadge } from "../components/PriorityBadge";
import { areas, estados, prioridades, tiposTramite } from "../data/catalogos";

export function TramitesPage({ tramites, updateEstado }) {
  const [filters, setFilters] = useState({
    search: "",
    prioridad: "",
    estado: "",
    area: "",
    tipo_tramite: "",
  });
  const [selected, setSelected] = useState(null);

  const filteredTramites = useMemo(() => {
    return tramites.filter((tramite) => {
      const search = filters.search.toLowerCase();

      const matchesSearch =
        !search ||
        tramite.ciudadano.toLowerCase().includes(search) ||
        tramite.dni.includes(search) ||
        tramite.tipo_tramite.toLowerCase().includes(search);

      const matchesPrioridad =
        !filters.prioridad || tramite.prioridad === filters.prioridad;

      const matchesEstado = !filters.estado || tramite.estado === filters.estado;
      const matchesArea = !filters.area || tramite.area === filters.area;

      const matchesTipo =
        !filters.tipo_tramite || tramite.tipo_tramite === filters.tipo_tramite;

      return (
        matchesSearch &&
        matchesPrioridad &&
        matchesEstado &&
        matchesArea &&
        matchesTipo
      );
    });
  }, [tramites, filters]);

  const handleFilter = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      prioridad: "",
      estado: "",
      area: "",
      tipo_tramite: "",
    });
  };

  return (
    <div className="space-y-7">
      <PageHeader
        title="Trámites registrados"
        description="Seguimiento administrativo de solicitudes ingresadas."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              name="search"
              value={filters.search}
              onChange={handleFilter}
              placeholder="Buscar por ciudadano, DNI o trámite..."
              className="input pl-10"
            />
          </div>

          <select
            name="prioridad"
            value={filters.prioridad}
            onChange={handleFilter}
            className="input"
          >
            <option value="">Todas las prioridades</option>
            {prioridades.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="estado"
            value={filters.estado}
            onChange={handleFilter}
            className="input"
          >
            <option value="">Todos los estados</option>
            {estados.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Limpiar filtros
          </button>

          <select
            name="area"
            value={filters.area}
            onChange={handleFilter}
            className="input"
          >
            <option value="">Todas las áreas</option>
            {areas.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="tipo_tramite"
            value={filters.tipo_tramite}
            onChange={handleFilter}
            className="input md:col-span-2 xl:col-span-4"
          >
            <option value="">Todos los tipos de trámite</option>
            {tiposTramite.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {filteredTramites.length === 0 ? (
          <div className="p-8">
            <EmptyState text="No hay trámites que coincidan con los filtros." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-4xl border-collapse text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Ciudadano</th>
                  <th className="px-4 py-3">Trámite</th>
                  <th className="px-4 py-3">Área</th>
                  <th className="px-4 py-3">Prioridad</th>
                  <th className="px-4 py-3">Tiempo</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Detalle</th>
                </tr>
              </thead>

              <tbody>
                {filteredTramites.map((tramite) => (
                  <tr
                    key={tramite.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-4 font-medium text-slate-700">
                      #{tramite.id}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-950">
                        {tramite.ciudadano}
                      </p>
                      <p className="text-xs text-slate-500">DNI {tramite.dni}</p>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {tramite.tipo_tramite}
                    </td>
                    <td className="px-4 py-4 text-slate-700">{tramite.area}</td>

                    <td className="px-4 py-4">
                      <PriorityBadge value={tramite.prioridad} />
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {tramite.tiempo_estimado} días
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={tramite.estado}
                        onChange={(event) =>
                          updateEstado(tramite.id, event.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600"
                      >
                        {estados.map((estado) => (
                          <option key={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(tramite)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <DetalleModal tramite={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function DetalleModal({ tramite, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">
              Detalle del trámite #{tramite.id}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Información completa del expediente municipal.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Info label="Ciudadano" value={tramite.ciudadano} />
          <Info label="DNI" value={tramite.dni} />
          <Info label="Tipo de trámite" value={tramite.tipo_tramite} />
          <Info label="Área responsable" value={tramite.area} />
          <Info label="Urgencia" value={tramite.urgencia} />
          <Info label="Estado actual" value={tramite.estado} />
          <Info label="Prioridad asignada" value={tramite.prioridad} />
          <Info label="Tiempo estimado" value={`${tramite.tiempo_estimado} días`} />
          <Info
            label="Documentos completos"
            value={tramite.documentos_completos ? "Sí" : "No"}
          />
          <Info
            label="Fecha de registro"
            value={new Date(tramite.created_at).toLocaleString()}
          />
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Descripción</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {tramite.descripcion}
          </p>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-semibold text-slate-950">
            Historial de estados
          </h4>

          <div className="mt-3 space-y-3">
            {tramite.historial?.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 px-4 py-3"
              >
                <p className="text-sm font-medium text-slate-800">
                  {item.estado}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.mensaje}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}