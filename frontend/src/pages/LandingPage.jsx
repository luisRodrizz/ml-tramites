import {
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  ShieldCheck,
} from "lucide-react";

export function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">
                Gestión Municipal ML
              </p>
              <p className="text-xs text-slate-500">
                Municipalidad Provincial de Yau
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 text-sm md:flex">
            <a
              href="#problema"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              Problema
            </a>
            <a
              href="#solucion"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              Solución
            </a>
            <a
              href="#flujo"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              Flujo
            </a>
            <a
              href="#ml"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              Machine Learning
            </a>
          </nav>

          <button
            onClick={onStart}
            className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Iniciar sesión
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Prototipo académico con Machine Learning
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Gestión de trámites municipales más rápida, transparente y
              ordenada.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
              Sistema automatizado para registrar solicitudes ciudadanas,
              clasificar trámites críticos mediante Machine Learning, generar
              reportes y notificar el avance de cada expediente.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Comenzar
                <ArrowRight size={17} />
              </button>

              <a
                href="#solucion"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver propuesta
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Prioridad" value="Baja / Media / Alta" />
              <MiniStat label="Alertas" value="Estado del trámite" />
              <MiniStat label="Reportes" value="Indicadores" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Expediente municipal
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Clasificación automática
                  </p>
                </div>

                <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  Prioridad alta
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <PreviewRow
                  icon={<FileText size={18} />}
                  title="Permiso de construcción"
                  text="Solicitud ingresada por ciudadano"
                />
                <PreviewRow
                  icon={<Brain size={18} />}
                  title="Modelo Machine Learning"
                  text="Analiza urgencia, área y documentos"
                />
                <PreviewRow
                  icon={<Bell size={18} />}
                  title="Notificación automática"
                  text="Ciudadano informado del avance"
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">
                    Tiempo estimado
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-blue-800">
                    3 días
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">
                    Estado
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-800">
                    En revisión
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problema" className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader
              label="Problema"
              title="Procesos manuales que generan demoras y poca transparencia."
              text="La Municipalidad Provincial de Yau presenta retrasos, colas, errores administrativos y falta de seguimiento para los ciudadanos."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <ProblemCard title="Largas colas" text="El ciudadano debe acudir presencialmente para consultar el avance de su trámite." />
              <ProblemCard title="Errores frecuentes" text="El manejo manual aumenta el riesgo de pérdida o registro incorrecto de expedientes." />
              <ProblemCard title="Falta de análisis" text="No existen indicadores claros para detectar áreas con mayor carga o retraso." />
              <ProblemCard title="Baja transparencia" text="El ciudadano no conoce con precisión el estado de su solicitud." />
            </div>
          </div>
        </section>

        <section id="solucion" className="mx-auto max-w-7xl px-5 py-14">
          <SectionHeader
            label="Solución"
            title="Sistema automatizado de gestión documental y trámites municipales."
            text="La plataforma digitaliza el registro, seguimiento, priorización y notificación de trámites ciudadanos."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              icon={<ClipboardList size={20} />}
              title="Registro digital"
              text="Centraliza las solicitudes y reduce el manejo manual de documentos."
            />
            <FeatureCard
              icon={<Brain size={20} />}
              title="Priorización ML"
              text="Clasifica trámites críticos según los datos ingresados."
            />
            <FeatureCard
              icon={<Bell size={20} />}
              title="Alertas"
              text="Informa al ciudadano cuando el estado del trámite cambia."
            />
            <FeatureCard
              icon={<BarChart3 size={20} />}
              title="Reportes"
              text="Genera indicadores para mejorar la toma de decisiones."
            />
          </div>
        </section>

        <section id="flujo" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <SectionHeader
              label="Flujo"
              title="Proceso propuesto de atención."
              text="Desde el registro inicial hasta la finalización del trámite, el sistema mantiene trazabilidad del expediente."
            />

            <div className="mt-8 grid gap-3 md:grid-cols-5">
              <FlowStep number="1" title="Registro" />
              <FlowStep number="2" title="Validación" />
              <FlowStep number="3" title="Análisis ML" />
              <FlowStep number="4" title="Revisión" />
              <FlowStep number="5" title="Notificación" />
            </div>
          </div>
        </section>

        <section id="ml" className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            label="Machine Learning"
            title="Modelo predictivo para priorizar trámites críticos."
            text="El sistema analiza tipo de trámite, área responsable, urgencia, documentos completos y descripción para clasificar la prioridad y estimar el tiempo de atención."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <ModelItem title="Datos usados" text="Tipo, área, urgencia, documentos y descripción." />
            <ModelItem title="Clasificación" text="Prioridad baja, media o alta." />
            <ModelItem title="Estimación" text="Tiempo aproximado en días." />
            <ModelItem title="Reportes" text="Apoyo para detectar cuellos de botella." />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Trabajo final · Taller de Desarrollo de Aplicaciones con Machine Learning</p>
          <button
            onClick={onStart}
            className="w-fit rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Acceder al sistema
          </button>
        </div>
      </footer>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function PreviewRow({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="rounded-lg bg-blue-50 p-2 text-blue-700">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function SectionHeader({ label, title, text }) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        {label}
      </span>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ProblemCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function FlowStep({ number, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
        {number}
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-800">{title}</p>
      <CheckCircle2 className="mx-auto mt-3 text-emerald-600" size={18} />
    </div>
  );
}

function ModelItem({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <ShieldCheck size={18} />
      </div>
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}