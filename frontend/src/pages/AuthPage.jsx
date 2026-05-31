import { Building2, ShieldCheck } from "lucide-react";

export function AuthPage({ onLogin }) {
  const users = [
    {
      role: "Administrador",
      name: "Administrador municipal",
      description: "Acceso a dashboard, reportes y gestión general.",
    },
    {
      role: "Personal municipal",
      name: "Personal municipal",
      description: "Acceso a revisión y actualización de trámites.",
    },
    {
      role: "Ciudadano",
      name: "Ciudadano",
      description: "Acceso a registro de trámites y feedback.",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-5">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <section className="border-b border-slate-200 bg-slate-950 p-8 text-white lg:border-b-0 lg:border-r">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-700">
              <Building2 size={28} />
            </div>

            <h1 className="mt-8 text-3xl font-semibold leading-tight">
              Sistema inteligente de gestión de trámites municipales
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Prototipo académico para la Municipalidad Provincial de Yau,
              orientado a digitalizar trámites, priorizar solicitudes mediante
              Machine Learning y mejorar la transparencia del servicio.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 text-blue-300" size={20} />
                <p className="text-sm leading-6 text-slate-300">
                  Selecciona un perfil para ingresar al sistema. El acceso es
                  simulado para fines demostrativos.
                </p>
              </div>
            </div>
          </section>

          <section className="p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Iniciar sesión
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Selecciona el tipo de usuario para la demostración.
            </p>

            <div className="mt-7 space-y-3">
              {users.map((user) => (
                <button
                  key={user.role}
                  onClick={() => onLogin(user)}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <p className="font-semibold text-slate-950">{user.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {user.description}
                  </p>
                  <span className="mt-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {user.role}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}