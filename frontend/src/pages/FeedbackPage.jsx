import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { Field } from "../components/Field";
import { PageHeader } from "../components/PageHeader";
import { initialFeedback } from "../data/catalogos";

export function FeedbackPage({
  tramites,
  feedbacks,
  createFeedback,
  feedbackLoading,
}) {
  const [form, setForm] = useState(initialFeedback);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "calificacion" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      tramite_id: form.tramite_id ? Number(form.tramite_id) : null,
    };

    await createFeedback(payload);
    setForm(initialFeedback);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        title="Feedback ciudadano"
        description="Registro de satisfacción y comentarios para mejorar el servicio."
      />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="space-y-5">
            <Field label="Trámite relacionado">
              <select
                name="tramite_id"
                value={form.tramite_id}
                onChange={handleChange}
                className="input"
              >
                <option value="">Sin trámite específico</option>
                {tramites.map((tramite) => (
                  <option key={tramite.id} value={tramite.id}>
                    #{tramite.id} - {tramite.ciudadano}
                  </option>
                ))}
              </select>
            </Field>

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

            <Field label="Calificación">
              <select
                name="calificacion"
                value={form.calificacion}
                onChange={handleChange}
                className="input"
              >
                <option value={5}>5 - Muy satisfecho</option>
                <option value={4}>4 - Satisfecho</option>
                <option value={3}>3 - Regular</option>
                <option value={2}>2 - Insatisfecho</option>
                <option value={1}>1 - Muy insatisfecho</option>
              </select>
            </Field>

            <Field label="Comentario">
              <textarea
                name="comentario"
                value={form.comentario}
                onChange={handleChange}
                rows={4}
                placeholder="Escriba un comentario sobre la atención recibida..."
                className="input resize-none"
              />
            </Field>

            <button
              disabled={feedbackLoading}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {feedbackLoading ? "Guardando..." : "Registrar feedback"}
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-950">
            Comentarios registrados
          </h3>

          <div className="mt-5 space-y-3">
            {feedbacks.length === 0 ? (
              <EmptyState text="Todavía no hay feedback registrado." />
            ) : (
              feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-950">
                        {item.ciudadano}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.comentario || "Sin comentario adicional."}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.calificacion}/5
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}