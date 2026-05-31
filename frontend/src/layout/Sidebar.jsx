import {
  BarChart3,
  Bell,
  Brain,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Building2,
  LogOut,
  MessageSquareText,
} from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "registro", label: "Registrar trámite", icon: FileText },
  { id: "tramites", label: "Trámites", icon: ClipboardList },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "modelo", label: "Modelo ML", icon: Brain },
  { id: "feedback", label: "Feedback", icon: MessageSquareText },
  { id: "alertas", label: "Alertas", icon: Bell },
];

export function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <aside className="rounded-none border-r border-slate-200 bg-white lg:min-h-screen">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-950">
              Gestión Municipal
            </h1>
            <p className="text-xs text-slate-500">ML para trámites</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-4 py-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                active
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mx-4 mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Usuario activo
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-950">
          {user?.name}
        </p>
        <p className="mt-1 text-xs text-slate-500">{user?.role}</p>

        <button
          onClick={onLogout}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}