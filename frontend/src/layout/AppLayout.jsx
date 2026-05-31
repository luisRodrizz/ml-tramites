import { Sidebar } from "./Sidebar";

export function AppLayout({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] lg:grid lg:grid-cols-[280px_1fr]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={onLogout}
      />

      <main className="min-w-0 px-5 py-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <section className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm shadow-slate-200/50 md:p-7">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}