import { Field } from "../components/Field";
import { PageHeader } from "../components/PageHeader";
import { areas, tiposTramite } from "../data/catalogos";

export function RegistroPage({ form, loading, handleChange, handleSubmit }) {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Registrar trámite"
        description="Formulario digital para ingresar solicitudes ciudadanas."
      />

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Ciudadano">
            <input
              name="ciudadano"
              value={form.ciudadano}
              onChange={handleChange}
              required
              placeholder="Nombres y apellidos"
              className="input"
            />
          </Field>

          <Field label="DNI">
            <input
              name="dni"
              value={form.dni}
              onChange={handleChange}
              required
              maxLength={8}
              placeholder="Ingrese DNI"
              className="input"
            />
          </Field>

          <Field label="Nivel de urgencia">
            <select name="urgencia" value={form.urgencia} onChange={handleChange} className="input">
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </Field>

          <Field label="Tipo de trámite">
            <select name="tipo_tramite" value={form.tipo_tramite} onChange={handleChange} className="input">
              {tiposTramite.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>

          <Field label="Área responsable">
            <select name="area" value={form.area} onChange={handleChange} className="input">
              {areas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>

          <div className="flex items-end">
            <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="documentos_completos"
                checked={form.documentos_completos}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Documentos completos
            </label>
          </div>

          <Field label="Descripción" className="md:col-span-2 xl:col-span-3">
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describa brevemente la solicitud..."
              className="input resize-none"
            />
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={loading}
            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Registrar y clasificar"}
          </button>
        </div>
      </form>
    </div>
  );
}